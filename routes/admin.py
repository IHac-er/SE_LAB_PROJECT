from flask import *
from .db import get_db_connection

admin_bp = Blueprint('admin', __name__)

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
