import type { FC } from "react";
import type { SortMode } from "../App";

interface IProps {
  sortTasks: (param: SortMode) => void;
}

const SortTasks: FC<IProps> = ({ sortTasks }: IProps) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <label htmlFor="sort">Sort:</label>
      <select className="form-select" name="sort" onChange={(e) => sortTasks(e.currentTarget.value as SortMode)}>
        <option value="default">Default</option>
        <option value="completed">Completed First</option>
        <option value="uncompleted">Uncompleted First</option>
        <option value="fresh">Date Fresh First</option>
        <option value="old">Date Old First</option>
      </select>
    </div>
  );
};

export default SortTasks;
