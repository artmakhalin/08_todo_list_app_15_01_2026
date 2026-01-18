import { useEffect, useMemo, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import SortTasks from "./components/SortTasks";

export interface ITask {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
}

export type SortMode = "default" | "completed" | "uncompleted";

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
        .then((data) => setTasks(data || []))
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.log(err);
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    if (sortMode === "default") {
      return tasks;
    }

    const byCompleted = (first: ITask, second: ITask) =>
      Number(first.completed) - Number(second.completed);
    const sorted = [...tasks].sort(byCompleted);
    return sortMode === "completed" ? sorted : sorted.reverse();
  }, [tasks, sortMode]);

  return (
    <div>
      <NewTask
        addTask={(newTask: ITask) => setTasks((prev) => [newTask, ...prev])}
      />
      <SortTasks sortTasks={setSortMode} />
      <TaskList
        tasks={visibleTasks}
        editTask={(newTask: ITask) =>
          setTasks((prev) =>
            prev.map((task) => (task.id === newTask.id ? newTask : task))
          )
        }
        deleteTask={(id: string) =>
          setTasks((prev) => prev.filter((task) => task.id !== id))
        }
      />
    </div>
  );
}

export default App;
