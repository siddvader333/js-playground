import "./CellListItem.css";
import { Cell } from "../../redux/Cell";
import ActionBar from "../ActionBar/ActionBar";
import CodeCell from "../CodeCell/CodeCell";
import TextEditor from "../TextEditor/TextEditor";
import JSCodeCell from "../JsCodeCell/JsCodeCell";

export interface CellListItemProps {
  cell: Cell;
  id: string;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element =
    cell.type === "code" ? (
      <div className="card">
        <div className="card-content">
          <ActionBar cellId={cell.id} />
          <JSCodeCell cell={cell} />
        </div>
      </div>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar cellId={cell.id} />
      </>
    );
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
