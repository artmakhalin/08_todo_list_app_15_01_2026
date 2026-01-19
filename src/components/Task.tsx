import { useState, type FC } from "react";
import type { ITask } from "../App";

interface IProps {
  task: ITask;
  editTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const Task: FC<IProps> = ({ task, editTask, deleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(task.title);
      setEditMode(false);
      return;
    }

    editTask({ ...task, title: trimmed });
    setEditMode(false);
  };

  const isOld =
    new Date().getTime() - new Date(task.createdAt).getTime() >
    1000 * 60 * 60 * 24 * 7;

  return (
    <div
      className="d-flex align-items-center  border rounded my-3 p-3 gap-3"
      style={{
        backgroundColor: task.completed
          ? "lightgray"
          : isOld
            ? "lightsalmon"
            : "white",
      }}
    >
      {editMode ? (
        <input
          className="form-control"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setDraft(task.title);
              setEditMode(false);
            }
          }}
        />
      ) : (
        <h4
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          onDoubleClick={() => setEditMode(true)}
          className="m-0"
        >
          {task.title}
        </h4>
      )}
      <span>{new Date(task.createdAt).toLocaleString()}</span>
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
