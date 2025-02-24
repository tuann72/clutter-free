import sqlite3

DATABASE = 'database.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(''' CREATE TABLE IF NOT EXISTS task(
        email TEXT PRIMARY KEY,
        name TEXT
    )''')
    
    cursor.execute(''' CREATE TABLE IF NOT EXISTS users(
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT,
        description TEXT,
        priority TEXT CHECK(priotiy IN ('easy','medium','hard')),
        FOREIGN KEY (user_email) REFERENCES users(email)
    )''')
    
    conn.commit()
    conn.close()
        