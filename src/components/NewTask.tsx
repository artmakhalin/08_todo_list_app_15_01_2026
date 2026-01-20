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
    <div className="toolbar">
      <label className="toolbar__field">
        <span className="toolbar__label">User</span>
        <input
          className="toolbar__control"
          type="number"
          min={1}
          max={10}
          value={userId}
          onChange={(e) => setUserId(+e.target.value)}
        />
      </label>
      <label className="toolbar__field toolbar__field--grow">
        <span className="toolbar__label">Task</span>
        <input
          className="toolbar__control"
          value={title}
          type="text"
          placeholder="Enter title.."
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
      </label>
      <button
        className="toolbar__btn"
        onClick={onSubmit}
        disabled={!title.trim()}
      >
        Add
      </button>
    </div>
  );
};

export default NewTask;
