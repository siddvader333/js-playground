import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { FileTypes } from "../../redux/Cell";
import "./AddCodeModal.css";
export interface AddCodeModalProps {
  previousCellId: string | null;
  isOpen: boolean;
  closeModal: () => void;
}

const AddCodeModal: React.FC<AddCodeModalProps> = ({
  isOpen,
  closeModal,
  previousCellId,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState(".js");
  const { insertCellAfter } = useActions();

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          closeModal();
        }}
      ></div>

      {/*Header*/}
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title has-text-right is-size-4">
            Create New Code Cell
          </div>
        </header>

        {/*Body*/}
        <section className="modal-card-body">
          <div className="columns is-vcentered">
            <div className="column is-5" />
            <div className="column is-5">
              <input
                onChange={(e) => setFileName(e.target.value)}
                className="input"
                type="text"
                placeholder="FileName"
              />
            </div>
            <div className="column is-2">
              <div className="select">
                <select onChange={(e) => setFileExtension(e.target.value)}>
                  <option>.js</option>
                  <option>.css</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/*Footer*/}
        <footer className="buttons is-right modal-card-foot">
          <button
            onClick={() => {
              insertCellAfter(
                previousCellId,
                "code",
                fileName + fileExtension,
                fileExtension as FileTypes
              );
              closeModal();
            }}
            className="button is-primary"
          >
            Save changes
          </button>
          <button
            onClick={() => {
              closeModal();
            }}
            className="button"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default AddCodeModal;
