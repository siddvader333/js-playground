import { useActions } from "../hooks/useActions";
import "./AddCellBar.css";

export interface AddCellBarProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCellBar: React.FC<AddCellBarProps> = ({
  previousCellId,
  forceVisible,
}) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="divider" />
    </div>
  );
};

export default AddCellBar;
