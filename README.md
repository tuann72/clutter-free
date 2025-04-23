# ClutterFree
An application designed for productivty by eliminating visual and interactive distractions.

# Demo
https://github.com/user-attachments/assets/1d8e5d83-e426-45dd-9e06-4f80cefb30bd



# System Architecture
<img width="1335" alt="Screenshot 2025-04-22 at 11 35 19 PM" src="https://github.com/user-attachments/assets/dcd42a19-fbd0-438b-be8f-6daf6c915963" />

# Technologies Used
All technologies' links can be found at the bottom of this section.

## Nodejs
- Javascript runtime environment

## NPM
- A Javascript package manager
- Provides easy method to install Javascript dependencies

## Nextjs
- A react-based framework
- Provides dynamic HTML streaming
- React-server side components
- Client and Server Rendering

## Shadcn
- Open-source component library
- Designed to be a component building block
- Can be modified significantly to suit developer needs

## Clerk
- Third-party user authentication service
- Handles user account and session management
- Provides variety of authentication options such as username, email, social accounts, etc.

## Openai API
- Third-party service that provides AI Models
- Handels natural language processing
- This API handles queries for the GPT-4o model to process Tasks

## Flask
-  Lightweight WSGI web application framework for Python
-  Used to create RESTful API for CRUD operations

## SQlite
- a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine
- Used for storing tasks and tasks attributes

## Technology Links
- NPM - https://www.npmjs.com/
- Node - https://nodejs.org/en
- Nextjs - https://nextjs.org/
- Shadcn - https://ui.shadcn.com/
- Clerk - https://clerk.com/
- OpenAI API - https://platform.openai.com/
- Flask - https://flask.palletsprojects.com/en/stable/
- SQlite - https://sqlite.org/

# Development Setup

This project contains two sections, the frontend and backend. The frontend can run standalone however if you want the functionailites for the website you will need setup the backend as well.

For convience we have hard coded some data so you can see what the frontend looks like given that the user has data imported.

**NOTE: You need to have nodejs and npm installed.**

Step 1: Clone the repository to desired location.

```bash
git clone https://github.com/tuann72/clutter-free.git
```

## Frontend

Step 1: Change directory into the frontend folder.
```bash
cd frontend
```

Step 2: Install frontend dependencies.
```bash
npm install
```

Step 3: Run the frontend in developer mode. (While you are in the frontend directory...)
```bash
npm run dev
```

## Backend
Step 1: Change directory into the backend folder.
```bash
cd backend
```

Step 2: Install backend dependencies.
```bash
pip install -r requirements. txt
```

Step 3: Run the backend in developer mode. (While you are in the backend directory...)
```bash
python3 app.py
```

## Openai API setup
Step 1: Obtain an API key from https://platform.openai.com/docs/overview


Step 2: Create a .env file inside the backend folder, so it should be /backend/.env


Step 3: Add OPENAI_API_KEY = [your api key] inside the .env file
