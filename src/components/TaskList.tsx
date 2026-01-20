import type { FC } from "react";
import Task from "./Task";
import type { ITask } from "../utils/constants.";

interface IProps {
  tasks: ITask[];
  editTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const TaskList: FC<IProps> = ({ tasks, editTask, deleteTask }: IProps) => {
  return (
    <div className="tasklist">
      <div className="tasklist__header">
        <h3 className="tasklist__title">Tasks</h3>
        <span className="tasklist__count">{tasks.length}</span>
      </div>

      <div className="tasklist__items">
        {tasks.length === 0 ? (
          <div className="tasklist__empty">No tasks yet ✨</div>
        ) : (
          tasks.map((t) => (
            <Task
              key={t.id}
              task={t}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
