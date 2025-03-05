import mysql.connector 

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="password@123",
        database="codeodessey"
    )

    