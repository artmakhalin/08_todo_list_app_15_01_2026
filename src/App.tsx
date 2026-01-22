import { useEffect, useMemo, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import SortTasks from "./components/SortTasks";
import { NavLink, Route, Routes } from "react-router-dom";
import type {
  ITask,
  IUser,
  SortTaskMode,
  SortUserMode,
} from "./utils/constants.";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import {
  createTask,
  deleteTask,
  editTask,
  fetchTask,
} from "./redux/taskAction";
import {
  createUser,
  deleteUser,
  editUser,
  fetchUser,
} from "./redux/userActions";
import SortUsers from "./components/SortUsers";

function App() {
  //4. Получение из глобального state данных и сеттеров и использование этих инструментов
  const dispatch = useDispatch<AppDispatch>();
  const tasks: ITask[] = useSelector(
    (state: RootState) => state.taskManager.tasks,
  );

  const users: IUser[] = useSelector(
    (state: RootState) => state.userManager.users,
  );

  const [sortTaskMode, setSortTaskMode] = useState<SortTaskMode>("default");
  const [sortUserMode, setSortUserMode] = useState<SortUserMode>("default");

  useEffect(() => {
    if (tasks.length === 0) {
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
        .then((data) => dispatch(fetchTask(data || [])))
        .catch((error) => console.log(error));
    }

    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error when fetch data");
          }
          return response.json();
        })
        .then((data) => dispatch(fetchUser(data || [])))
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
      console.log(err);
    }
  }, [tasks, users]);

  const visibleTasks = useMemo(() => {
    const taskCopy = [...tasks];

    const byCompletedAsc = (a: ITask, b: ITask) => +a.completed - +b.completed;
    const byCreatedAtAsc = (a: ITask, b: ITask) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt);

    const byCreatedAtDesc = (a: ITask, b: ITask) =>
      Date.parse(b.createdAt) - Date.parse(a.createdAt);

    const stable = (primary: number, a: ITask, b: ITask) =>
      primary !== 0 ? primary : byCompletedAsc(a, b);

    switch (sortTaskMode) {
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
  }, [tasks, sortTaskMode]);

  const visibleUsers = useMemo(() => {
    const usersCopy = [...users];

    switch (sortUserMode) {
      case "nameAsc":
        return usersCopy.sort((first: IUser, second: IUser) =>
          first.name.localeCompare(second.name),
        );
      case "nameDesc":
        return usersCopy.sort((first: IUser, second: IUser) =>
          second.name.localeCompare(first.name),
        );
      default:
        return usersCopy;
    }
  }, [users, sortUserMode]);

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
                addTask={(newTask: ITask) => dispatch(createTask(newTask))}
              />
              <SortTasks sortTasks={setSortTaskMode} value={sortTaskMode} />
              <TaskList
                tasks={visibleTasks}
                editTask={(newTask: ITask) => dispatch(editTask(newTask))}
                deleteTask={(id: string) => dispatch(deleteTask(id))}
              />
            </>
          }
        ></Route>
        <Route
          path="/phone_book"
          element={
            <>
              <NewUser
                addUser={(newUser: IUser) => dispatch(createUser(newUser))}
              />
              <SortUsers sortUsers={setSortUserMode} value={sortUserMode} />
              <UserList
                users={visibleUsers}
                editUser={(newUser: IUser) => dispatch(editUser(newUser))}
                deleteUser={(id: string) => dispatch(deleteUser(id))}
              />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
