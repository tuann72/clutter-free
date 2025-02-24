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


Add new user
```bash
curl -X POST http://127.0.0.1:5000/users \
     -H "Content-Type: application/json" \
     -d '{"email": "daniel@gmail.com", "name": "Daniel Jacob"}'
```

Retrieve user
```bash
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com
```

Add task for a user
```bash
curl -X POST http://127.0.0.1:5000/users/daniel@gmail.com/tasks \
     -H "Content-Type: application/json" \
     -d '{"description": "Finish homework", "priority": "medium"}'
```

Retrieve all tasks for a user
```bash
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com/tasks
```

Update a task's description and/or priority (use the correct task ID)
```bash
curl -X PUT http://127.0.0.1:5000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"description": "Submit homework", "priority": "hard"}'
```

Delete task (use the correct task ID)
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/1
```

Delete user
```bash
curl -X DELETE http://127.0.0.1:5000/users/daniel@gmail.com
```




