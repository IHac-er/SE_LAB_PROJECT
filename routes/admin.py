from flask import *
from .db import get_db_connection
import time
import psutil

admin_bp = Blueprint('admin', __name__)

active_users = {}

# Admin login page
@admin_bp.route('/admin_login')
def admin_login():
    if 'name' in session and 'email' in session:
        return render_template('admin/admin.html', name=session['name'], email=session['email'])
    return redirect('/login')

# Fetch all users
@admin_bp.route('/get-users', methods=['GET'])
def get_users():
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT name, email FROM users")
    users = cursor.fetchall()

    cursor.close()
    db.close()

    # Convert list of tuples to list of dictionaries
    user_list = [{"name": user[0], "email": user[1]} for user in users]

    return jsonify(user_list)

# Edit user details (name, email, password)
@admin_bp.route('/edit-user', methods=['POST'])
def edit_user():
    data = request.json
    email = data.get("email")  # Existing email
    name = data.get("name")
    new_email = data.get("newEmail")
    password = data.get("password")

    if not email or not (name or new_email or password):
        return jsonify({"message": "No changes provided"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    update_query = "UPDATE users SET "
    update_values = []
    
    if name:
        update_query += "name = %s, "
        update_values.append(name)
    if new_email:
        update_query += "email = %s, "
        update_values.append(new_email)
    if password:
        update_query += "password = %s, "
        update_values.append(password)  # Ensure hashing before storing in DB

    update_query = update_query.rstrip(", ") + " WHERE email = %s"
    update_values.append(email)

    try:
        cursor.execute(update_query, update_values)
        db.commit()
        message = "User details updated successfully"
    except Exception as e:
        db.rollback()
        message = f"Error updating user: {str(e)}"
    finally:
        cursor.close()
        db.close()

    return jsonify({"message": message})

# Reset user progress
@admin_bp.route('/revert-progress', methods=['POST'])
def reset_progress():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute("UPDATE user_details SET xp = 0, user_rank = 'bronze', badges = 0, day_streak = 0 WHERE email = %s", (email,))
        db.commit()
        message = "User progress reset successfully"
    except Exception as e:
        db.rollback()
        message = f"Error resetting progress: {str(e)}"
    finally:
        cursor.close()
        db.close()

    return jsonify({"message": message})

# Delete user
@admin_bp.route('/delete-user', methods=['POST'])
def delete_user():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute("DELETE FROM users WHERE email = %s", (email,))
        cursor.execute("DELETE FROM user_details WHERE email = %s", (email,))
        db.commit()
        message = "User deleted successfully"
    except Exception as e:
        db.rollback()
        message = f"Error deleting user: {str(e)}"
    finally:
        cursor.close()
        db.close()

    return jsonify({"message": message})

@admin_bp.route('/dashboard-stats', methods=['GET'])
def dashboard_stats():
    db = get_db_connection()
    cursor = db.cursor()

    # Get total user count
    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    cursor.close()
    db.close()

    # Remove inactive users (10-minute timeout)
    current_time = time.time()
    active_users_filtered = {email: t for email, t in active_users.items() if current_time - t < 600}
    
    return jsonify({
        "total_users": total_users,
        "active_users": len(active_users_filtered)
    })

@admin_bp.route('/track-activity', methods=['POST'])
def track_activity():
    if 'email' in session:
        active_users[session['email']] = time.time()
    return jsonify({"status": "updated"})

@admin_bp.route('/add-user', methods=['POST'])
def add_user():
    """ Adds a new user to the database """
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required!"})

    db = get_db_connection()
    cursor = db.cursor()

    # Check if user already exists
    cursor.execute("SELECT email FROM users WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({"success": False, "message": "User already exists!"})

    # Insert user into MySQL
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",(name, email, password))
    cursor.execute("INSERT INTO user_details (email) VALUES (%s)",(email,))
    db.commit()

    cursor.close()
    db.close()

    return jsonify({"success": True, "message": "User added successfully!"})

@admin_bp.route('/execute-query', methods=['POST'])
def execute_query():
    data = request.json
    query = data.get("query")

    if not query:
        return jsonify({"error": "Query cannot be empty"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute(query)
        if query.strip().lower().startswith("select"):
            results = cursor.fetchall()
            column_names = [desc[0] for desc in cursor.description]
            results = [dict(zip(column_names, row)) for row in results]
        else:
            db.commit()
            results = []
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({"results": results})

@admin_bp.route('/server-status')
def server_status():
    # Measure CPU usage over 1 second to get an accurate value
    cpu_usage = psutil.cpu_percent(interval=1)

    return jsonify({
        'CPU Usage': cpu_usage,
        'Memory Usage': psutil.virtual_memory().percent,
        'Disk Usage': psutil.disk_usage('/').percent
    })