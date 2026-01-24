import type { FC } from "react";
import type { SortUserMode } from "../utils/constants";

interface IProps {
  sortUsers: (param: SortUserMode) => void;
  value: SortUserMode;
}

const SortUsers: FC<IProps> = ({ sortUsers, value }: IProps) => {
  return (
    <div className="toolbar toolbar--compact">
      <label className="toolbar__field toolbar__field--grow">
        <span className="toolbar__label">Sort</span>
        <select
          className="toolbar__control"
          value={value}
          onChange={(e) => sortUsers(e.currentTarget.value as SortUserMode)}
        >
          <option value="default">Default</option>
          <option value="nameAsc">Name (A - Z)</option>
          <option value="nameDesc">Name (Z - A)</option>
        </select>
      </label>
    </div>
  );
};

export default SortUsers;
