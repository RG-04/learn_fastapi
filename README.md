# Blog Site Setup Guide

This guide outlines the steps to set up and run the Blog Site.

## Setup

### 1. Creating a Virtual Environment

In the home directory, create a new Python virtual environment named `testapp` using `venv`:

```bash
python -m venv testapp
testapp\Scripts\activate
pip install -r requirements.txt
```

### 2. Database for blogs

- In a directory of your choice, create a folder to store the blogs.

- Open the api.py file located in the backend/api folder.

- Change the DOCUMENT_PATH variable to the absolute path of the folder created.

### 3. Installing Frontend dependencies

Assuming node is installed:

```bash
cd frontend
npm i
```

## Running the app

### 1. Starting the backend

```bash
cd backend
fastapi run main.py
```

### 2. Starting the frontend

In a new terminal

```bash
cd frontend
npm start
```

### 3. Use the app

You're done! Navigate to localhost:3000 in your browser
