import sqlite3

DATABASE = 'database.db'

# create the sqlite db
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  
    return conn

# intialzie the db
def initialize_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # table that holds all users (primary key is the email)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY
        )
    ''')

    # table that holds all the tasks
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,
            task TEXT,
            category TEXT CHECK(category IN ('Work', 'Health', 'Home', 'Growth', 'Social')),
            estimate INTEGER,
            intensity INTEGER CHECK(intensity BETWEEN 1 AND 5),
            status TEXT DEFAULT 'not-started',
            FOREIGN KEY (user_email) REFERENCES users(email)
        )
    ''')
    
    conn.commit()
    conn.close()
