from flask import Flask, request, jsonify, abort
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

@app.route('/process-tasks', methods=['POST'])
def rate_tasks():
    try:
        data = request.get_json()
        tasks = data.get('tasks', [])
        
        if not tasks:
            return jsonify({"error": "No tasks provided"}), 400

        prompt = f"""
        Analyze, rate intensity, categorize, and estimate the time to complete each of these tasks. Intensity should be in terms of difficulities from 1 to 5 with 5 being the hardest. Categorize them into 'Work', 'Health', 'Home', 'Growth', and 'Social'. Estimate the time to complete each task in minutes. The task name should also be returned as "Task." There should also be a default status value with "Not-Started" for each task. The response should be a JSON object with a "tasks" array containing objects with the following keys: "task", "category", "intensity", "estimate", and "status". The tasks are: 
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
if __name__ == '__main__':
    app.run(debug=True)
