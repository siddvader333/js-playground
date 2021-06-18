import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import IconButton from "../IconButton/IconButton";
import "./ActionBar.css";

export interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { deleteCell, moveCell } = useActions();
  const fileName = useTypedSelector(
    (state) => state.cells!.data[cellId].fileName
  );
  return (
    <div className="action-bar columns">
      <div className="column is-4 is-4-mobile">
        <p className="subtitle is-5">{fileName}</p>
      </div>
      <div className="column is-4 is-4-fullhd is-4-desktop is-1-tablet is-1-mobile"></div>
      <div className="column is-4 is-7-mobile">
        <div className="icon-group field buttons is-right">
          <IconButton
            iconName="fa-arrow-up"
            onClick={() => moveCell(cellId, "up")}
          />
          <IconButton
            iconName="fa-arrow-down"
            onClick={() => moveCell(cellId, "down")}
          />
          <IconButton iconName="fa-times" onClick={() => deleteCell(cellId)} />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
