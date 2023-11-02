import sqlite3
from datetime import datetime

conn = sqlite3.connect("passwords.db")
cursor = conn.cursor()

def create_table():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY,
            application TEXT,
            username TEXT,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

def create_password(application, username, password):
    current_time = datetime.now()
    cursor.execute("INSERT INTO passwords (application, username, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)", 
                   (application, username, password, current_time, current_time))
    conn.commit()

def read_passwords():
    cursor.execute("SELECT * FROM passwords")
    data = cursor.fetchall()
    return data

def update_password(password_id, application, username, password):
    current_time = datetime.now()
    cursor.execute("UPDATE passwords SET website=?, username=?, password=?, updated_at=? WHERE id=?",
                   (application, username, password, current_time, password_id))
    conn.commit()

def delete_password(password_id):
    cursor.execute("DELETE FROM passwords WHERE id=?", (password_id,))
    conn.commit()
