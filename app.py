from flask import Flask, render_template, request, redirect, session
import mysql.connector

app = Flask(__name__)
app.secret_key = "codeodessey"  # Required for session management

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password@123",
        database="codeodessey"
    )

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/dashboard')
def dashboard():
    if 'name' in session and 'email' in session:
        return render_template('dashboard.html', name=session['name'], email=session['email'])
    return redirect('/login')  

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('name', None)  # Remove name
    session.pop('email', None)  # Remove email
    return redirect('/')

@app.route('/signup', methods=['POST'])
def register_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']

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

@app.route('/login', methods=['POST'])
def login_user():
    email = request.form['email']
    password = request.form['password']

    db = get_db_connection()
    cursor = db.cursor()
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    values = (email, password)
    cursor.execute(query, values)
    user = cursor.fetchone()
    cursor.close()
    db.close()

    if user:
        session['name'] = user[1]
        session['email'] = user[2]  # Store username in session
        return redirect('/dashboard')  # Redirect to homepage
    else:
        return "Invalid Credentials. Try Again."

@app.route('/python')
def python():
    return render_template('languages/python.html')

@app.route('/C')
def C():
    return render_template('languages/C.html')

@app.route('/Cpp')
def Cpp():
    return render_template('languages/Cpp.html')

@app.route('/HTML')
def HTML():
    return render_template('languages/HTML.html')

@app.route('/CSS')
def CSS():
    return render_template('languages/CSS.html')

@app.route('/404')
def ER404():
    return render_template('404.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
