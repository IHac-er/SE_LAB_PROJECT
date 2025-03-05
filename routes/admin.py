from flask import *
from .db import get_db_connection

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin_login')
def admin_login():
    if 'name' in session and 'email' in session:
        return render_template('admin/admin.html', name=session['name'], email=session['email'])
    return redirect('/login')  

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