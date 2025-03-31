from flask import Flask, request, jsonify, abort
import sqlite3
from db import get_db, initialize_db
from dotenv import load_dotenv
from openai import OpenAI  
import os
import json

# Load environment variables first
load_dotenv()

app = Flask(__name__)

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # New client initialization

# we intialize the db here
with app.app_context():
    initialize_db()
    
# creates a new user and inserts into db
@app.route('/users', methods=['POST'])
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
        conn.commit()
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
@app.route('/users/<email>', methods=['PUT'])
def update_user(email):
    data = request.get_json()
    name = data.get('name')
    if not name:
        abort(400, "name is required to update")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET name = ? WHERE email = ?", (name, email))
    conn.commit()
    conn.close()
    return jsonify({"message": "User name updated succesfully"})

# Delete user
@app.route('/users/<email>', methods=['DELETE'])
def remove_user(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE email = ?", (email,))
    conn.commit()
    conn.close()
    return jsonify({"message": "user is deleted successfully"})

# create a new task given a certain user
@app.route('/users/<email>/tasks', methods=['POST'])
def create_task(email):
    data = request.get_json()
    description = data.get('description')
    priority = data.get('priority')
    if not description or priority not in ('easy', 'medium', 'hard'):
        abort(400, "Invalid description or priority. Priority must be easy, medium or hard")
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (user_email, description, priority) VALUES (?,?,?)", 
                   (email, description, priority))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
    return jsonify({"message": f"Task number {task_id} successfully created"}), 201

# get all tasks for a given user
@app.route('/users/<email>/tasks', methods=['GET'])
def get_all_tasks(email):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE user_email = ?", (email,))
    tasks = cursor.fetchall()
    conn.close()
    # uses list comprehension to create a list of dictionaries fomr the rows in DB
    tasks_list = [dict(task) for task in tasks]
    return jsonify(tasks_list)

# update the description or priority of a task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    description = data.get('description')
    priority = data.get('priority')
    if priority and priority not in ('easy', 'medium', 'hard'):
        abort(400, "invalid priority level")
    
    conn = get_db()
    cursor = conn.cursor()
    
    if description:
        cursor.execute("UPDATE tasks SET description = ? WHERE id = ?", (description, task_id))
    if priority:
        cursor.execute("UPDATE tasks SET priority = ? WHERE id = ?", (priority, task_id))
        
    conn.commit()
    conn.close()
    return jsonify({"message": "task has been updated"})

# delete a task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn =get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "task deleted"})

@app.route('/process-tasks', methods=['POST'])
def rate_tasks():
    try:
        data = request.get_json()
        tasks = data.get('tasks', [])
        
        if not tasks:
            return jsonify({"error": "No tasks provided"}), 400

        prompt = f"""
        Analyze, rate intensity, categorize, and estimate the time to complete each of these tasks. Intensity should be in terms of difficulities from 1 to 5 with 5 being the hardest. Categorize them into 'Work', 'Health', 'Home', 'Growth', and 'Social'. Estimate the time to complete each task in minutes. The task name should also be returned as "Task." There should also be a default status value with "Not Started" for each task. The response should be a JSON object with a "tasks" array containing objects with the following keys: "task", "category", "intensity", "estimate", and "status". The tasks are: 
        The tasks are:
        Tasks: {json.dumps(tasks)}
        """
        
        # Updated API call syntax
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a task rating assistant. Return a JSON object with a 'tasks' array containing objects with and in the order of 'Work', 'Health', 'Home', 'Growth', and 'Social'."
                },
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        # Access response content differently in v1.0+
        result = json.loads(response.choices[0].message.content)
        
        # Validate structure
        # if not all('task' in item and 'rating' in item for item in result.get('tasks', [])):
        #     raise ValueError("Invalid response structure")

        return jsonify(result.get('tasks', []))

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse AI response"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__=='__main__':
    app.run(debug=True)

    
    
    