from flask import *
from .db import get_db_connection
import mysql.connector 

auth_bp = Blueprint('auth', __name__)

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

        query_user_details = "INSERT INTO user_details (email) VALUES (%s)"
        values_user_details = (email,)
        cursor.execute(query_user_details, values_user_details)

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

        values = (email, password)
        cursor.execute(query, values)
        user = cursor.fetchone()
        cursor.close()
        db.close()

        if user:
            session['name'] = user[0]
            session['email'] = user[1]
            return redirect("/admin_login")
        else:
            return "Invalid Credentials. Try Again."
        
    else:
        query = "SELECT * FROM users WHERE email = %s AND password = %s"

        values = (email, password)
        cursor.execute(query, values)
        user = cursor.fetchone()

        if user:
            session['name'] = user[0]
            session['email'] = user[1]
        else:
            return "Invalid Credentials. Try Again."
        
        query = "SELECT * FROM user_details WHERE email = %s"

        values = (email,)
        cursor.execute(query, values)
        user = cursor.fetchone()
        cursor.close()
        db.close()

        session['bio'] = user[1]
        session['xp'] = user[2]
        session['rank'] = user[3]
        session['badges'] = user[4]
        session['streak'] = user[5]

        return redirect("/dashboard")
    