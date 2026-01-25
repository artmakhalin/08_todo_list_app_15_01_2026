import { useMemo, useState, type FC } from "react";
import type { ITask } from "../utils/constants";

interface IProps {
  task: ITask;
  editTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  findUser: (id: string) => string;
}

const Task: FC<IProps> = ({ task, editTask, deleteTask, findUser }) => {
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

  const isOld = useMemo(() => {
    const week = 1000 * 60 * 60 * 24 * 7;
    return new Date().getTime() - new Date(task.createdAt).getTime() > week;
  }, [task.createdAt]);

  const formattedDate = useMemo(() => {
    return new Date(task.createdAt).toLocaleString();
  }, [task.createdAt]);

  return (
    <div
      className={[
        "task",
        task.completed ? "task--completed" : "",
        isOld && !task.completed ? "task--old" : "",
      ].join(" ")}
    >
      <div className="task__main">
        {editMode ? (
          <input
            className="task__edit"
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
            className="task__title"
            onDoubleClick={() => setEditMode(true)}
            title="Double click to edit"
          >
            {task.title}
          </h4>
        )}
        <div className="task__meta">
          <span className="task__badge">{findUser(String(task.userId))}</span>
          <span className="task__date">{formattedDate}</span>
        </div>
      </div>

      <div className="task__actions">
        <label className="task__check">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => editTask({ ...task, completed: e.target.checked })}
          />
          <span>Done</span>
        </label>
        <button className="task__delete" onClick={() => deleteTask(task.id)}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Task;
