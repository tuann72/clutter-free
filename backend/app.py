from flask import Flask, request, jsonify, abort
from db import get_db, initialize_db
from dotenv import load_dotenv
from openai import OpenAI
from flask_cors import CORS  
import os
import json

# Load environment variables first
load_dotenv()

app = Flask(__name__)

# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # New client initialization

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

# creates tasks, tasks are then processed by the OpenAI API to get the intensity, category, estimate, and status.
@app.route('/users/<email>/tasks', methods=['POST'])
def create_tasks(email):
    try:
        # get tasks from the request body.
        data = request.get_json()
        tasks_input = data.get('tasks')
        if not tasks_input:
            return jsonify({"error": "No task provided"}), 400

        #Prompt for openai API.
        prompt = f"""
        Analyze, rate intensity, categorize, and estimate the time to complete each of the following tasks.
        Intensity should be from 1 to 5 (with 5 being the hardest). Categorize each task into one of: 'Work', 'Health', 'Home', 'Growth', or 'Social'.
        Estimate the time to complete each task in minutes. Return the task name as "task" and include a default status "not-started" for each.
        The response should be a JSON object with a "tasks" array. Each object in the array should have the following keys: "task", "category", "intensity", "estimate", and "status".
        Tasks: {json.dumps(tasks_input)}
        """

        # Call openai API to process the tasks.
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a task rating assistant. Return a JSON object with a 'tasks' array containing objects with keys: 'task', 'category', 'intensity', 'estimate', and 'status'."
                },
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        #Parse the API response.
        result = json.loads(response.choices[0].message.content)
        processed_tasks = result.get('tasks')
        if not processed_tasks or not isinstance(processed_tasks, list):
            return jsonify({"error": "Processed tasks response is missing or invalid"}), 500

        # Validate each processed task has the required keys.
        required_keys = {"task", "category", "intensity", "estimate", "status"}
        for task in processed_tasks:
            if not required_keys.issubset(task.keys()):
                return jsonify({"error": "One or more processed tasks are missing required fields"}), 500

        #Insert the processed tasks into the database.
        conn = get_db()
        cursor = conn.cursor()
        inserted_task_ids = []
        for task in processed_tasks:
            cursor.execute('''
                INSERT INTO tasks (user_email, task, category, estimate, intensity, status)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                email,
                task.get('task'),
                task.get('category'),
                task.get('estimate'),
                task.get('intensity'),
                task.get('status')
            ))
            inserted_task_ids.append(cursor.lastrowid)
        conn.commit()
        conn.close()

        #Return success message.
        return jsonify({
            "message": f"{len(inserted_task_ids)} tasks successfully created",
            "task_ids": inserted_task_ids
        }), 201

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse AI response"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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
    app.run(port=8000, debug=True)
