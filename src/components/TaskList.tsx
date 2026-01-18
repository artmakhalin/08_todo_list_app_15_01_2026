import type { FC } from "react";
import type { ITask } from "../App";
import Task from "./Task";

interface IProps {
  tasks: ITask[];
  editTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const TaskList: FC<IProps> = ({ tasks, editTask, deleteTask }: IProps) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 30px #ccc",
      margin: "30px auto 0",
      padding: "30px",
      backgroundColor: "whitesmoke",
      maxWidth: "800px"
    }}>
      {tasks.map((e) => (
        <Task key={e.id} task={e} editTask={editTask} deleteTask={deleteTask}></Task>
      ))}
    </div>
  );
};

export default TaskList;
