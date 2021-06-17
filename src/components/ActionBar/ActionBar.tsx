import { useActions } from "../../hooks/useActions";
import "./ActionBar.css";

export interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { deleteCell, moveCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(cellId)}
      >
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
