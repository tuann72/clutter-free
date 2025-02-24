To test backend functions, use the the following commands

1. Run Flask application (if flask is not installed, run "pip install flask"
python app.py
2. Open new terminal and run Curl commands

3. Add new user
curl -X POST http://127.0.0.1:5000/users -H "Content-Type: application/json" -d '{"email": "daniel@gmail.com", "name": "Daniel Jacob"}'
4. Retrieve user
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com
5. Add task for a user
curl -X POST http://127.0.0.1:5000/users/daniel@gmail.com/tasks -H "Content-Type: application/json" -d '{"description": "Finish homework", "priority": "medium"}'
6. Retrieve all tasks for a user
curl -X GET http://127.0.0.1:5000/users/daniel@gmail.com/tasks
7. Update a task's description and/or priority (use the correct task ID)
curl -X PUT http://127.0.0.1:5000/tasks/1 -H "Content-Type: application/json" -d '{"description": "Submit homework", "priority": "hard"}'
8. Delete task (use the correct task ID)
curl -X DELETE http ://127.0.0.1:5000/tasks/1
9. Delete user
curl -X DELETE http://127.0.0.1:5000/users/daniel@gmail.com



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




