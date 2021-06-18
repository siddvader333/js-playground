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
    <div className="action-bar columns is-vcentered">
      <div className="column is-4 is-4-mobile">
        <p className="subtitle is-6">{fileName}</p>
      </div>
      <div className="column is-4 is-4-fullhd is-4-desktop is-1-tablet is-1-mobile"></div>
      <div className="column is-4 is-7-mobile">
        <div className="icon-group field buttons is-right">
          <IconButton
            styleClasses="is-primary is-light is-small"
            iconName="fas fa-arrow-up"
            onClick={() => moveCell(cellId, "up")}
          />
          <IconButton
            styleClasses="is-primary is-light is-small"
            iconName="fas fa-arrow-down"
            onClick={() => moveCell(cellId, "down")}
          />
          <IconButton
            styleClasses="is-primary is-light is-small"
            iconName="fas fa-times"
            onClick={() => deleteCell(cellId)}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
