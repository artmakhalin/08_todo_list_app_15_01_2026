import { useEffect, useMemo, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import SortTasks from "./components/SortTasks";
import { NavLink, Route, Routes } from "react-router-dom";
import type { ITask, IUser, SortMode } from "./utils/constants.";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";

function App() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    try {
      const raw = localStorage.getItem("tasks");
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;
    } catch {
      return [];
    }
  });

  const [users, setUsers] = useState<IUser[]>([]);

  const [sortMode, setSortMode] = useState<SortMode>("default");

  useEffect(() => {
    if (!localStorage.getItem("tasks")) {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error when fetch data");
          }
          return response.json();
        })
        .then((data) =>
          data.map((task: ITask) => ({
            ...task,
            createdAt: new Date(2026, 0, 1, 0, 0, 0).toISOString(),
          })),
        )
        .then((data) => setTasks(data || []))
        .catch((error) => console.log(error));
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error when fetch data");
        }
        return response.json();
      })
      .then((data) => setUsers(data || []))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.log(err);
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const taskCopy = [...tasks];

    const byCompletedAsc = (a: ITask, b: ITask) => +a.completed - +b.completed;
    const byCreatedAtAsc = (a: ITask, b: ITask) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt);

    const byCreatedAtDesc = (a: ITask, b: ITask) =>
      Date.parse(b.createdAt) - Date.parse(a.createdAt);

    const stable = (primary: number, a: ITask, b: ITask) =>
      primary !== 0 ? primary : byCompletedAsc(a, b);

    switch (sortMode) {
      case "uncompleted":
        return taskCopy.sort(byCompletedAsc);
      case "completed":
        return taskCopy.sort(byCompletedAsc).reverse();
      case "old":
        return taskCopy.sort((first: ITask, second: ITask) =>
          stable(byCreatedAtAsc(first, second), first, second),
        );
      case "fresh":
        return taskCopy.sort((first: ITask, second: ITask) =>
          stable(byCreatedAtDesc(first, second), first, second),
        );
      default:
        return taskCopy;
    }
  }, [tasks, sortMode]);

  return (
    <div>
      <nav className="d-flex justify-content-center gap-3 py-4">
        <NavLink to="/task_manager" className="btn btn-info">
          Task Manager
        </NavLink>
        <NavLink to="/phone_book" className="btn btn-info">
          Phone Book
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/task_manager"
          element={
            <>
              <NewTask
                addTask={(newTask: ITask) =>
                  setTasks((prev) => [newTask, ...prev])
                }
              />
              <SortTasks sortTasks={setSortMode} value={sortMode} />
              <TaskList
                tasks={visibleTasks}
                editTask={(newTask: ITask) =>
                  setTasks((prev) =>
                    prev.map((task) =>
                      task.id === newTask.id ? newTask : task,
                    ),
                  )
                }
                deleteTask={(id: string) =>
                  setTasks((prev) => prev.filter((task) => task.id !== id))
                }
              />
            </>
          }
        ></Route>
        <Route
          path="/phone_book"
          element={
            <>
              <NewUser
                addUser={(newUser: IUser) =>
                  setUsers((prev) => [newUser, ...prev])
                }
              />
              <UserList
                users={users}
                editUser={(newUser: IUser) =>
                  setUsers((prev) =>
                    prev.map((user) =>
                      user.id === newUser.id ? newUser : user,
                    ),
                  )
                }
                deleteUser={(id: string) =>
                  setUsers((prev) => prev.filter((user) => user.id !== id))
                }
              />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
