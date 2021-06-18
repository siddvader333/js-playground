import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Cell } from "../../redux/Cell";
import CodeEditor from "../CodeEditor/CodeEditor";
//import "./CssCodeCell.css";

export interface CssCodeCellProps {
  cell: Cell;
}
const CssCodeCell: React.FC<CssCodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const rawCode = useTypedSelector((state) => state.cells!.data);
  const bundle = useTypedSelector((state) => state.bundles![cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.fileName!, rawCode);
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.fileName!, rawCode);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawCode, cell.id, createBundle]);

  return (
    <div className="columns">
      <div className="column is-full">
        <CodeEditor
          initialValue={cell.content}
          onChange={(value) => updateCell(cell.id, value)}
          fileType={cell.fileType}
        />
      </div>
    </div>
  );
};

export default CssCodeCell;
