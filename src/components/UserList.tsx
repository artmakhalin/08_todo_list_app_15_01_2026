import type { FC } from "react";
import type { IUser } from "../utils/constants";
import User from "./User";

interface IProps {
  users: IUser[];
  editUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
}

const UserList: FC<IProps> = ({ users, editUser, deleteUser }: IProps) => {
  return (
    <div className="tasklist">
      <div className="tasklist__header">
        <h3 className="tasklist__title">Users</h3>
        <span className="tasklist__count">{users.length}</span>
      </div>

      <div className="tasklist__items">
        {users.length === 0 ? (
          <div className="tasklist__empty">No users yet ✨</div>
        ) : (
          users.map((u) => (
            <User
              key={u.id}
              user={u}
              editUser={editUser}
              deleteUser={deleteUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
