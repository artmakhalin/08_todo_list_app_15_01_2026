import { useRef, type FC } from "react";
import type { ITask } from "../App";
import { v4 } from "uuid";

interface IProps {
  addTask: (newTask: ITask) => void;
}

const NewTask: FC<IProps> = ({ addTask }) => {
  const inputUserId = useRef<HTMLInputElement>(null);
  const inputNewTask = useRef<HTMLInputElement>(null);
  return (
    <div className="d-flex" style={{
      margin: "0 auto",
      maxWidth: "650px",
      paddingTop: "30px",
      gap: "70px"
    }}>
      <label>
        Enter user ID:
        <input className="form-control" ref={inputUserId} type="number" min={1} max={10} />
      </label>
      <label>
        Enter new task:
        <input className="form-control" ref={inputNewTask} type="text" />
      </label>
      <button className="btn btn-primary"
        onClick={() => {
          addTask({
            id: v4(),
            completed: false,
            title: inputNewTask.current!.value,
            userId: +inputUserId.current!.value,
          });
          inputNewTask.current!.value = inputUserId.current!.value = "";
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
