import { type FC } from "react";
import type { ITask } from "../App";

interface IProps {
  task: ITask;
  editTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const Task: FC<IProps> = ({ task, editTask, deleteTask }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editTitle = (e: any) => {
    const input = document.createElement("input");
    input.oncontextmenu = (e) => {
      e.preventDefault();
      editTask({ ...task, title: input.value });
      const h1 = document.createElement("h1");
      h1.textContent = input.value;
      h1.onclick = editTitle;
      input.replaceWith(h1);
    };
    input.defaultValue = e.target.textContent;
    e.target!.replaceWith(input);
  };
  return (
    <div
      className="d-flex align-items-center  border rounded my-3 p-3 "
      style={{
        gap: "30px",
        backgroundColor: "white",
      }}
    >
      <h1
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
        onClick={editTitle}
      >
        {task.title}
      </h1>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => editTask({ ...task, completed: e.target.checked })}
      />
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteTask(task.id)}
      >
        X
      </button>
    </div>
  );
};

export default Task;
