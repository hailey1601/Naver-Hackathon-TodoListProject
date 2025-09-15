# To-Do App
## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
Example (replace with your actual steps)  
- `npm install`  
- `npm start`

## 🔗 Deployed Web URL or APK file
✍️ https://naver-hackathon-todolist.netlify.app


## 🎥 Demo Video
**Demo video link:**  
✍️ [Paste your video link here]


## 💻 Project Introduction

### a. Overview

This application, OwlHelp, is a "Student Time Management Solution" designed to help Vietnamese university students organize their daily tasks and academic responsibilities. It features a clean, simple interface with a calming green, gray, and white color palette. The solution addresses the core challenge of juggling multiple tasks across different platforms by providing a single, centralized tool.

### b. Key Features & Function Manual

- Task Management (CRUD): Users can create new tasks with a title, due date, and time. Existing tasks can be edited, marked as complete, or deleted.

- Dynamic Task Views: The app automatically sorts and displays tasks in three clear categories: To Do, Completed, and Upcoming, helping users manage their priorities effectively.

- Motivational Messages: Users receive random motivational quotes from a pre-written array, providing a positive and encouraging experience.

- Persistent Storage: All tasks are saved locally to the user's browser, ensuring the list remains available across sessions.
  
### c. Unique Features (What’s special about this app?) 

Our unique approach with OwlHelp focuses on providing a clean, distraction-free interface that helps students maintain focus. The combination of dynamic task categorization with an integrated motivational message feature offers a seamless and engaging way to manage tasks. The design prioritizes a straightforward user experience, making it easy for students to quickly add and manage tasks without a steep learning curve while feeling encouraged along the way.

### d. Technology Stack and Implementation Methods

- Frontend: React, Vite

- Styling: CSS

- Data Persistence: Browser's localStorage API

### e. Service Architecture & Database structure (when used)

The project is built as a Single-Page Application (SPA), with all logic and rendering handled on the client side using React components. State is managed via React hooks. The localStorage API serves as a simple key-value store, where tasks are saved as a JSON string for easy access and manipulation.

## 🧠 Reflection

### a. If you had more time, what would you expand?

If I had more time, I would expand the application to include user accounts and a backend database (like Firebase or Supabase). This would enable real-time synchronization across multiple devices, allowing students to access their to-do list from their phone and laptop seamlessly. I would also add a sharing feature for group tasks, where a project manager could assign tasks to different members and track progress in real-time.

### b. If you integrate AI APIs more for your app, what would you do?

To further integrate AI, I would use a language model API to implement a "Smart Prioritization" feature. The AI could analyze a student's past task completion times, procrastination patterns, and current deadlines to provide a dynamic, AI-sorted list of tasks. This would go beyond simple urgency and truly help students tackle what they are most likely to avoid. Additionally, the AI could send personalized "Procrastination Alerts" based on learned behavior, prompting the student to start a task before it's too late.

## ✅ Checklist
- [x] Code runs without errors  
- [x] All required features implemented (add/edit/delete/complete tasks)  
- [x] All ✍️ sections are filled  
