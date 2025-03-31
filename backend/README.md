# **Backend API Testing Guide**

Follow these steps to test the backend functions using **Flask** and **cURL**.

---

## **Run the Flask Application**
If Flask is **not installed**, run:
```bash
pip install flask
```

Run Flask application:

```bash
python app.py
```

## **Function to test API**

Add new user:
```bash
curl -X POST http://127.0.0.1:5000/users -H "Content-Type: application/json" -d '{"email": "daniel@gmail.com"}'
```

Retrieve user:
```bash
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com
```

Add task for a user:
```bash
curl -X POST http://127.0.0.1:5000/users/daniel@gmail.com/tasks -H "Content-Type: application/json" -d '{"task": "Finish homework", "category": "Work", "estimate": 45, "intensity": 3}'
```

Retrieve all tasks for a user:
```bash
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com/tasks
```

Update a task's attributes (single field change) _be sure to use proper task number_:
```bash
curl -X PUT http://127.0.0.1:5000/tasks/1 -H "Content-Type: application/json" -d '{"status": "in-progress"}'
```

Update a task's attributes (multi-field change) _be sure to use proper task number_:
```bash
curl -X PUT http://127.0.0.1:5000/tasks/1 -H "Content-Type: application/json" -d '{"task": "Submit report", "intensity": 4, "status": "complete"}'
```

Delete task (use the correct task ID):
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/1
```

Delete user:
```bash
curl -X DELETE http://127.0.0.1:5000/users/daniel@gmail.com
```




