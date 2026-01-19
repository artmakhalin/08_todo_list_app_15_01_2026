import { useState, type FC } from "react";
import type { ITask } from "../App";
import { v4 } from "uuid";

interface IProps {
  addTask: (newTask: ITask) => void;
}

const NewTask: FC<IProps> = ({ addTask }) => {
  const [userId, setUserId] = useState<number>(1);
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    addTask({
      id: v4(),
      completed: false,
      title: trimmed,
      userId,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setUserId(1);
  };
  return (
    <div
      className="d-flex gap-4 align-items-end"
      style={{
        margin: "0 auto",
        maxWidth: "650px",
        paddingTop: "30px",
      }}
    >
      <label className="w-25">
        Enter user ID:
        <input
          className="form-control"
          type="number"
          min={1}
          max={10}
          value={userId}
          onChange={(e) => setUserId(+e.target.value)}
        />
      </label>
      <label className="flex-grow-1">
        Enter new task:
        <input
          className="form-control"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
      </label>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={!title.trim()}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
