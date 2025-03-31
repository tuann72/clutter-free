from flask import Flask, request, jsonify, abort
from db import get_db, initialize_db

app = Flask(__name__)

# intialize the db. Important to delete the db if we re-factor it. "rm data database.db"
with app.app_context():
    initialize_db()
    
# we intialize the db here
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    if not email:
        abort(400, "Email is required")
    
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (email) VALUES (?)", (email,))
        conn.commit()
    except:
        abort(400, "User already exists")
    finally:
        conn.close()
    
    return jsonify({"message": "User created successfully"}), 201

# retrieve a user
@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    if user is None:
        abort(404, "User not found")
    return jsonify(dict(user))

# deletes a user
@app.route('/users/<email>', methods=['DELETE'])
def remove_user(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE email = ?", (email,))
    conn.commit()
    conn.close()
    return jsonify({"message": "User deleted successfully"})

# creates a task for a user
@app.route('/users/<email>/tasks', methods=['POST'])
def create_task(email):
    data = request.get_json()
    task = data.get('task')
    category = data.get('category')
    estimate = data.get('estimate')
    intensity = data.get('intensity')
    
    if not task or category not in ('Work', 'Health', 'Home', 'Growth', 'Social') or \
       not isinstance(estimate, int) or not (1 <= intensity <= 5):
        abort(400, "Invalid or missing task data")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO tasks (user_email, task, category, estimate, intensity)
        VALUES (?, ?, ?, ?, ?)
    ''', (email, task, category, estimate, intensity))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()

    return jsonify({"message": f"Task number {task_id} successfully created"}), 201

# gets all the tasks given a user email
@app.route('/users/<email>/tasks', methods=['GET'])
def get_all_tasks(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE user_email = ?", (email,))
    tasks = cursor.fetchall()
    conn.close()
    tasks_list = [dict(task) for task in tasks]
    return jsonify(tasks_list)

# updates a task. 1 or multiple fields can be edited. 
# Could use PATCH instead of PUT, only a one word change, but they work the same in this implementation
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    allowed_fields = ['task', 'category', 'estimate', 'intensity', 'status']
    
    # Only keep valid fields from the incoming data
    update_fields = {k: v for k, v in data.items() if k in allowed_fields}
    if not update_fields:
        abort(400, "No valid fields to update")
    
    conn = get_db()
    cursor = conn.cursor()
    
    # updates only the values provided for a taks
    for field, value in update_fields.items():
        cursor.execute(f"UPDATE tasks SET {field} = ? WHERE id = ?", (value, task_id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Task updated successfully"})

# deletes a task given the task id
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
