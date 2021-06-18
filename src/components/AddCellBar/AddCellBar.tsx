import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import AddCodeModal from "../AddCodeModal/AddCodeModal";
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
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <AddCodeModal
        previousCellId={previousCellId}
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <div className={`add-cell ${forceVisible && "force-visible"}`}>
        <div className="add-buttons">
          <button
            className="button is-primary is-light is-small"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-plus" />
            </span>
            <span>Code</span>
          </button>
          <button
            className="button is-primary is-light is-small"
            onClick={() => insertCellAfter(previousCellId, "text", null, null)}
          >
            <span className="icon is-small">
              <i className="fas fa-plus" />
            </span>
            <span>Text</span>
          </button>
        </div>

        <div className="divider" />
      </div>
    </>
  );
};

export default AddCellBar;
