import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Cell } from "../../redux/Cell";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import ResizableContainer from "../ResizableContainer/ResizableContainer";

export interface JsCodeCellProps {
  cell: Cell;
}

const JSCodeCell: React.FC<JsCodeCellProps> = ({ cell }) => {
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
      <div className="column is-7">
        <CodeEditor
          initialValue={cell.content}
          onChange={(value) => updateCell(cell.id, value)}
          fileType={cell.fileType}
        />
      </div>
      <div className="column">
        <Preview
          errorMessage={!bundle ? "" : bundle.error}
          bundledCode={!bundle ? "" : bundle.code}
        />
      </div>
    </div>
  );
};

export default JSCodeCell;
