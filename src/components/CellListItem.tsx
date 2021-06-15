import "./CellListItem.css";
import { Cell } from "../redux/Cell";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

export interface CellListItemProps {
  cell: Cell;
  id: string;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element =
    cell.type === "code" ? (
      <>
        <div className="action-bar-wrapper">
          <ActionBar cellId={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar cellId={cell.id} />
      </>
    );
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
