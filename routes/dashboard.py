from flask import *
import mysql.connector

dashboard_bp = Blueprint('dashboard', __name__)


# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password@123",
        database="codeodessey"
    )

@dashboard_bp.route('/dashboard')
def dashboard():
    if 'email' in session:
        return render_template('dashboard/dashboard.html')
    return redirect('/login')  

@dashboard_bp.route('/view-profile')
def viewprofile():
    if 'email' in session:
        return render_template('dashboard/viewprofile.html')
    return redirect('/dashboard')  

@dashboard_bp.route('/settings')
def settings():
    if 'email' in session:
        return render_template('dashboard/settings.html')
    return redirect('dashboard')

@dashboard_bp.route('/edit-profile', methods=['POST'])
def edit_profile():
    data = request.get_json()
    new_name = data.get('name')
    new_bio = data.get('bio')
    email = session.get('email')  # To identify the user

    if not email:
        return "Unauthorized", 401

    db = get_db_connection()
    cursor = db.cursor()

    try:
        # Update name in 'users' table
        cursor.execute("UPDATE users SET name = %s WHERE email = %s", (new_name, email))

        # Update bio in 'user_details' table
        cursor.execute("UPDATE user_details SET bio = %s WHERE email = %s", (new_bio, email))

        db.commit()
        session['name'] = new_name
        session['bio'] = new_bio  # Update session data too

        return "Profile updated", 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return "Database error", 500

    finally:
        cursor.close()
        db.close()

@dashboard_bp.route('/reset-progress', methods=['POST'])
def reset_progress():
    email = session.get('email')
    if not email:
        return "Unauthorized", 401

    db = get_db_connection()
    cursor = db.cursor()

    try:
        reset_query = """
            UPDATE user_details
            SET bio = '', xp = 0, user_rank = 'bronze', badges = 0, day_streak = 0
            WHERE email = %s
        """
        cursor.execute(reset_query, (email,))
        db.commit()

        #Clearing Session data 
        session.clear()

        return "Progress reset", 200

    except mysql.connector.Error as err:
        print(f"Error resetting progress: {err}")
        return "Database error", 500

    finally:
        cursor.close()
        db.close()

@dashboard_bp.route('/delete-account', methods=['POST'])
def delete_account():
    email = session.get('email')
    if not email:
        return "Unauthorized", 401

    db = get_db_connection()
    cursor = db.cursor()

    try:
        # Delete from both tables
        cursor.execute("DELETE FROM user_details WHERE email = %s", (email,))
        cursor.execute("DELETE FROM users WHERE email = %s", (email,))
        db.commit()

        # Clear session after deleting account
        session.clear()

        return "Account deleted", 200

    except mysql.connector.Error as err:
        print(f"Error deleting account: {err}")
        return "Database error", 500

    finally:
        cursor.close()
        db.close()