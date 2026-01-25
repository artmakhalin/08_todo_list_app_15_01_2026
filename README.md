# ✅ Task Manager + 📒 Phone Book (React + TypeScript + Redux)

A clean and minimal **React + TypeScript** app that combines two small modules:

- ✅ **Task Manager** — create, edit, complete, sort tasks, with persistent storage
- 📒 **Phone Book** — manage contacts (CRUD), sort users, clean UI

The project is designed as a **portfolio-ready pet project** with a focus on **best practices**, **code readability**, and **modern React patterns**.

---

## ✨ Features

### ✅ Task Manager
- ➕ Create tasks
- ✏️ Inline edit (double click)
- ✅ Toggle completion state
- 🗑 Delete tasks
- 🕒 Task timestamps (`createdAt`)
- 🔥 Highlight old tasks (7+ days)
- 🔍 Sorting:
  - Default
  - Completed / Uncompleted first
  - Fresh / Old first
- 👤 Displays user name based on `userId`

### 📒 Phone Book
- ➕ Add new users
- ✏️ Inline edit
- 🗑 Delete users
- 🔤 Sorting by name:
  - A → Z
  - Z → A

### 🎨 UI / UX
- 🌗 Light / Dark theme toggle
- 💎 Minimal glass-style UI (custom CSS + variables)
- 📱 Responsive layout (mobile-friendly)

### 💾 Persistence
- Local storage support for tasks & users  
  (`store.subscribe()` saves state automatically)

---

## 🧰 Tech Stack

- ⚛️ **React**
- 🟦 **TypeScript**
- 🧭 **React Router**
- 🧠 **Redux Toolkit (RTK)** *(active version)*
- 🧩 **Classic Redux (legacy version included for learning)**
- 🎨 **Bootstrap (basic utility usage) + custom CSS**
- 🔑 **UUID** for unique IDs
- 🌐 **JSONPlaceholder API** for initial demo data

---

## 🗂 Project Structure

```txt
src/
  components/
    NewTask.tsx
    Task.tsx
    TaskList.tsx
    SortTasks.tsx

    NewUser.tsx
    User.tsx
    UserList.tsx
    SortUsers.tsx

  redux/              # ✅ Classic Redux version (legacy)
    store.ts
    taskReducer.ts
    userReducer.ts
    taskAction.ts
    userActions.ts

  reduxRTK/           # ✅ Redux Toolkit (connected by default)
    storeRTK.ts
    taskSlice.ts
    userSlice.ts
    themeSlice.ts

  utils/
    constants.ts

  App.tsx
  main.tsx
```
## 🚀 Getting Started
1) Clone the repo
git clone <your-repo-url>
cd <your-repo-folder>

2) Install dependencies
npm install

3) Run the project
npm run dev


App will be available at:

http://localhost:5173

## 🔄 Redux Versions

This repository includes two Redux implementations:

### ✅ 1) Redux Toolkit (RTK) — (currently connected)

Used in production by default:
```
import { storeRTK } from "./reduxRTK/storeRTK";
```

Why RTK?

- Less boilerplate

- Built-in Immer (safe mutations)

- More readable slices

- Industry standard

### 🧩 2) Classic Redux (legacy)

Kept for educational purposes:
```
src/redux/
```

Includes:

- manual reducers

- manual action types

- classic store creation

✅ Great for understanding how Redux works under the hood.

## 🌐 Data Source

The app loads initial demo data from:

- Tasks: https://jsonplaceholder.typicode.com/todos?_limit=10

- Users: https://jsonplaceholder.typicode.com/users

After first load, everything is stored inside localStorage.

## 📌 Notes / Improvements Ideas

If I continue improving the project, I would add:

- ⏳ Loading / error UI for async fetch

- 🔍 Search (tasks & users)

- ✅ Filters (only completed / active tasks)

- 📦 Pagination for large lists

- 🧪 Tests (React Testing Library)