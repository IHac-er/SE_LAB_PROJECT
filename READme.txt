_*My Website*_

This is a Flask-based website that includes user authentication with MySQL, session handling, and a dashboard displaying user details. The website is designed as a local proof-of-concept and does not require an external server.


*Features*

1. User signup and login system (with MySQL)
2. Stores user details (name & email) and displays them on the dashboard
3. Session-based authentication
4. Logout functionality
5. Animated homepage with a typing effect
6. Responsive UI with a background image limited to the first section


*Requirements*

1. Before running the project, ensure you have the following installed:
2. Python 3.x
3. Flask (for backend functionality)
4. MySQL Server (to store user data)
5. MySQL Connector (to connect Python with MySQL)

Run the following command to install required Python packages:
pip install flask mysql-connector-python


*Database Setup*

CREATE DATABASE codeodessey; 

USE codeodessey;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

_NOTE_: Please update the app.py file with your MySQL password. 


*Running the Website:*

1. Open the project directory

2. Open terminal in that directory and run "python app.py"

3. Open browser and go to "http://127.0.0.1:5000/"


