# Kanban board with Table

## Tech Stack:

- Frontend: Next.js, ShadCN, Context Api
- Backend: Express.js
- Database: MongoDB

# Features:

1. Auth - Sign Up, Login ( JWT )

2. Task Management-

   - Sort and filter based on Status and Priority and Due Date ( allow creating custom function if )

3. Additional

   - Proper Errors
   - Form Validation ( client and server side )
   - Responsive
   - UI Components: Modals, ToolTips, Drag n Drop, Dropdown, Notifs
   - Include comments
   - TS is must

## Pages

1. Home Page

   - Some nice UI
   - Option for login and signup

2. Main Screen

   - Task List
     - Table
   - Kanban
     - Board

## API

1. Auth

   - POST /register : To create account
   - POST /sign in : To login

2. Tasks ( header : user token )

   - POST /task : Create a new task
   - GET /task : Get all tasks
   - GET /task/:id : Get all task by id
   - PATCH /task/:id : Edit a task
   - DELETE /task/:id : Delete a task

## Schema:

**user**

```
email
password
token
task []
```

**task**

```
user id
title : string, required
description : string, optional
status: To Do, In Progress, Completed
priority: Low, Medium, High
Due Date: date, optional
```
