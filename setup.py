import subprocess
import mysql.connector
import re
import pkg_resources
from getpass import getpass
from time import sleep 
import os

# List of required packages
REQUIRED_PACKAGES = ['flask', 'mysql-connector-python']

def is_package_installed(package):
    #Check if a package is installed using pkg_resources. 
    installed_packages = {pkg.key for pkg in pkg_resources.working_set}
    return package.lower() in installed_packages

def install_packages():
    #Install missing required packages.
    for package in REQUIRED_PACKAGES:
        if not is_package_installed(package):
            subprocess.call(['pip', 'install', package])

def get_db_connection(passcode):
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=passcode,
    )

def reset_db(db):
    cursor = db.cursor
    cursor.execute("DROP DATABASE CODEODESSEY")
    cursor.close()
    db.close()

def setup_database_and_tables(db):
    cursor = db.cursor()

    # Create Database if not exists
    cursor.execute("CREATE DATABASE IF NOT EXISTS codeodessey")
    cursor.execute("USE codeodessey")

    # Create users table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )
    """)

    # Create user_details table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_details (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        bio VARCHAR(255) DEFAULT '',
        xp INT DEFAULT 0,
        user_rank VARCHAR(255) DEFAULT 'bronze',
        badges INT DEFAULT 0,
        day_streak INT DEFAULT 0
    )
    """)

    # Create admin table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin (
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
        password VARCHAR(100) NOT NULL
    )
    """)

    cursor.close()
    db.close()

def get_stored_password():
    """Reads the MySQL password from routes/db.py."""
    try:
        with open("routes/db.py", "r") as file:
            content = file.read()
            match = re.search(r'password="([^"]+)"', content)
            if match:
                return match.group(1)  # Extracts the password from the file
    except FileNotFoundError:
        print("⚠️ ERROR: CONTACT THARUN FOR ASSISTANCE ⚠️")
    return None  # Return None if no password is found

def update_db_password(new_password):
    """Updates the MySQL password in routes/db.py if it's different."""
    try:
        with open("routes/db.py", "r") as file:
            content = file.read()
        
        # Replace the existing password with the new one
        updated_content = re.sub(r'password="([^"]+)"', f'password="{new_password}"', content)

        with open("routes/db.py", "w") as file:
            file.write(updated_content)

        print("✅ Database password code setup ready.")
    except FileNotFoundError:
        print("⚠️ ERROR: CONTACT THARUN FOR ASSISTANCE ⚠️")

if __name__ == '__main__':
    print("📦 Installing required packages...")
    install_packages()
    print("✅ Packages ready.")

    db = None
    passcode = None

    # 🔄 Loop until the user enters the correct password
    while True:
        print("🔑 Enter your MySQL password:")
        passcode = getpass(">> ")
        try:
            # Try connecting to MySQL with the entered password
            db = get_db_connection(passcode)
            break  # Exit loop if connection is successful

        except mysql.connector.Error:
            print("❌ Incorrect MySQL password. Please try again.")
    
    #Resetting database if problems keep persisting. 
    reset = input("⚠️ DO YOU WANT TO RESET EVERYTHING? (TYPE 'YES' ONLY IF YOU HAD ISSUES WITH WEBSITE, THIS WILL DELETE YOUR MYSQL DATABASE) ⚠️: ").lower().strip()
    if reset == 'yes':
        reset_db(db)

    # 🛠️ Set up database and tables using the correct password
    setup_database_and_tables(db)
    print("✅ MySQL Ready.")

    # 🔄 After successful setup, update db.py with the correct password
    stored_password = get_stored_password()
    
    if stored_password is None or stored_password != passcode:
        update_db_password(passcode)
    
    print("🚀 Setup complete. You can now run the website.")

    subprocess.Popen(["start", "cmd", "/k", "python app.py"], shell=True)
    sleep(2)

    url = "http://127.0.0.1:5000/"
    try:
        os.system(f'start chrome "{url}"')
    except:
        pass
