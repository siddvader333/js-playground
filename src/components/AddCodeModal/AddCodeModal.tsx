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

      <div className="columns modal-content-container is-vcentered is-mobile">
        <div className="column is-4-fullhd is-4-desktop is-2-tablet is-1-mobile "></div>

        <div className="column is-4-fullhd is-4-desktop is-8-tablet is-10-mobile">
          <div className="card">
            <div className="card-content">
              <div className="columns is-vcentered is-centered">
                <div className="column has-text-centered is-full">
                  <p className="modal-title subtitle-is-5 is-light">
                    New Code Cell
                  </p>
                </div>
              </div>
              <div className="columns is-mobile is-centered is-gapless">
                <div className="column is-8">
                  <input
                    onChange={(e) => setFileName(e.target.value)}
                    className="input is-light"
                    type="text"
                    placeholder="FileName"
                  />
                </div>
                <div className="column is-4">
                  <div className="select is-light">
                    <select onChange={(e) => setFileExtension(e.target.value)}>
                      <option>.js</option>
                      <option>.css</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="columns is-vcentered has-text-centered is-mobile ">
                <div className="column is-full">
                  <div className="field buttons is-centered">
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
                      className="button is-primary is-small is-light"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                      }}
                      className="button is-small is-light"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-4-fullhd is-4-desktop is-2-tablet is-1-mobile "></div>
      </div>
    </div>
  );
};
export default AddCodeModal;
