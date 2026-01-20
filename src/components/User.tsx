import { useState, type FC } from "react";
import type { IUser } from "../utils/constants.";

interface IProps {
  user: IUser;
  editUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
}

const User: FC<IProps> = ({ user, editUser, deleteUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(user.name);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(user.name);
      setEditMode(false);
      return;
    }

    editUser({ ...user, name: trimmed });
    setEditMode(false);
  };

  return (
    <div className="task">
      <div className="task_main">
        {editMode ? (
          <input
            className="task_edit"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setDraft(user.name);
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
            {user.name}
          </h4>
        )}
        <div className="task__meta">
          <span className="task__badge">{user.phone}</span>
          <span className="task__badge">{user.email}</span>
        </div>
      </div>

      <div className="task__actions">
        <button className="task__delete" onClick={() => deleteUser(user.id)}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default User;
