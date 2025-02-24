from flask import Flask, request, jsonify, abort
import sqlite3
from db import get_db, initialize_db

app = Flask(__name__)

# we intialize the db here
@app.before_first_request
def intialize():
    initialize_db()
    
# creates a new user and inserts into db
@app.route('/users', method=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name','')
    if not email:
        abort(400, "email is required")
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (email, name) VALUES (?, ?)", 
                       (email,name))
    except sqlite3.IntegrityError:
        abort(400, "user already exists")
    finally:
        conn.close()
    return jsonify({"message":"user created successfully"}), 201

# retrieve a user from email_id
@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    if user is None:
        abort(404, "user not in database")
    return jsonify(dict(user))

# if we need to update a users name (will come back to this method)
# @app.route('/users/<email>', methods=['PUT'])
# def update_user

# Delete user
@app.route('/users/<email>', methods=['DELETE'])
def remove_user(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE email = ?", (email,))
    conn.commit()
    conn.close()
    return jsonify({"message: user is deleted successfully"})

# create a new task given a certain user
@app.route('/users/<email>/tasks', method=['POST'])
def create_task(email):
    data = request.get_json()
    description = data.get('description')
    priority = data.get('priority')
    if not description or priority not in ('easy', 'medium', 'hard'):
        abort(400, "Invalid description or priority. Priority must be easy, medium or hard")
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (user_email, description, priority) VALUES (?,?,?)"
                    (email, description, priority))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
    return jsonify({"message": f"Task number {task_id} successfully created"}), 201

# get all tasks for a given user
@app.route('/users/<email>/tasks', method=['GET'])
def get_all_tasks(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE user_email = ?", (email,))
    tasks = cursor.fetchall()
    conn.close()
    # uses list comprehension to create a list of dictionaries fomr the rows in DB
    tasks_list = [dict(task) for task in tasks]
    return jsonify(tasks_list)

# the description or priority of a task
@app.route('/tasks/,int:task_id>', method=['PUT'])
def update_task(task_id):
    data = request.get_json()
    description = data.get('description')
    priority = data.get('priority')
    if priority and priority not in ('easy', 'medium', 'hard'):
        abort(400, "invalid priority level")
    
    conn = get_db()
    cursor = conn.cursor()
    
    if description:
        cursor.execute("UPDATE tasks SET description = ? WHERE id = ?", (description, id))
    if priority:
        cursor.execute("UPDATE tasks SET priority = ? WHERE id = ?", (priority, id))
        
    conn.commit()
    conn.close()
    return jsonify({"message": "task has been updated"})

# delete a task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn =get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE task_id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "task deleted"})

if __name__=='__main__':
    app.run(debug=True)

    
    
    