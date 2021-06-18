import "./CellListItem.css";
import { Cell } from "../../redux/Cell";
import ActionBar from "../ActionBar/ActionBar";
import TextEditor from "../TextEditor/TextEditor";
import JSCodeCell from "../JsCodeCell/JsCodeCell";
import CssCodeCell from "../CssCodeCell/CssCodeCell";

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
          {cell.fileType === ".js" ? (
            <JSCodeCell cell={cell} />
          ) : (
            <CssCodeCell cell={cell} />
          )}
        </div>
      </div>
    ) : (
      <div className="card">
        <div className="card-content">
          <ActionBar cellId={cell.id} />
          <TextEditor cell={cell} />
        </div>
      </div>
    );
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
