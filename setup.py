import subprocess
import mysql.connector

# List of required packages
REQUIRED_PACKAGES = ['Flask', 'mysql-connector-python']

def install_packages():
    for package in REQUIRED_PACKAGES:
        subprocess.call(['pip', 'install', package])

def get_db_connection():
    passcode = input("Enter your MySQL password: ")
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=f"{passcode}",
    )

def setup_database_and_tables():
    db = get_db_connection()
    cursor = db.cursor()

    # Create Database if not exists
    cursor.execute("CREATE DATABASE IF NOT EXISTS codeodessey")
    cursor.execute("USE codeodessey")

    # Create users table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )
    """)

    # Create user_details table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_details (
        email varchar(255) NOT NULL PRIMARY KEY,
        bio varchar(255) DEFAULT '',
        xp int DEFAULT 0,
        user_rank varchar(255) DEFAULT 'bronze',
        badges int DEFAULT 0,
        day_streak int DEFAULT 0
    )
    """)

    # Create admin table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin (
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )
    """)

    print("✅ Database and tables are ready.")
    cursor.close()
    db.close()

if __name__ == '__main__':
    print("📦 Installing required packages...")
    install_packages()

    print("🛠️ Setting up database and tables...")
    setup_database_and_tables()

    print("🚀 Setup complete. You can now run the website.")

    input()
