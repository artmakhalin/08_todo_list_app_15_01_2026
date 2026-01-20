import type { FC } from "react";
import type { SortMode } from "../utils/constants.";

interface IProps {
  sortTasks: (param: SortMode) => void;
  value: SortMode;
}

const SortTasks: FC<IProps> = ({ sortTasks, value }: IProps) => {
  return (
    <div className="toolbar toolbar--compact">
      <label className="toolbar__field toolbar__field--grow">
        <span className="toolbar__label">Sort</span>
        <select
          className="toolbar__control"
          value={value}
          onChange={(e) => sortTasks(e.currentTarget.value as SortMode)}
        >
          <option value="default">Default</option>
          <option value="completed">Completed First</option>
          <option value="uncompleted">Uncompleted First</option>
          <option value="fresh">Date Fresh First</option>
          <option value="old">Date Old First</option>
        </select>
      </label>
    </div>
  );
};

export default SortTasks;
