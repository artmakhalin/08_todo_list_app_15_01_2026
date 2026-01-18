import type { FC } from "react";
import type { SortMode } from "../App";

interface IProps {
  sortTasks: (param: SortMode) => void;
}

const SortTasks: FC<IProps> = ({ sortTasks }: IProps) => {
  return (
    <div>
      <label htmlFor="sort">Sort:</label>
      <select name="sort" onChange={(e) => sortTasks(e.currentTarget.value as SortMode)}>
        <option value="default">Default</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </div>
  );
};

export default SortTasks;
