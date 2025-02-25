from flask import *
import mysql.connector

auth_bp = Blueprint('auth', __name__)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password@123",
        database="codeodessey"
    )

@auth_bp.route('/login')
def login():
    return render_template('login.html')

@auth_bp.route('/logout')
def logout():
    session.pop('name', None)  # Remove name
    session.pop('email', None)  # Remove email
    return redirect('/')

@auth_bp.route('/signup', methods=['POST'])
def register_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']

    if "codeodyssey" in email:
        return "Invalid Email. Try Again"

    try:
        db = get_db_connection()
        cursor = db.cursor()
        query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        values = (name, email, password)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()
        return redirect('/login')  # Redirect to login page after signup
    except mysql.connector.Error as err:
        return f"Error: {err}"

@auth_bp.route('/login', methods=['POST'])
def login_user():
    email = request.form['email']
    password = request.form['password']
    
    db = get_db_connection()
    cursor = db.cursor()

    # Check if email contains "codeodyssey"
    if "codeodyssey" in email:
        query = "SELECT * FROM admin WHERE email = %s AND password = %s"
        admin_redirect = "/admin_login"
    else:
        query = "SELECT * FROM users WHERE email = %s AND password = %s"
        admin_redirect = "/dashboard"

    values = (email, password)
    cursor.execute(query, values)
    user = cursor.fetchone()
    cursor.close()
    db.close()

    if user:
        session['name'] = user[1]
        session['email'] = user[2]
        return redirect(admin_redirect)  # Redirect based on role
    else:
        return "Invalid Credentials. Try Again."