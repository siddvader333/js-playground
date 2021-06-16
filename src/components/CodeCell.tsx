import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import ResizableContainer from "./ResizableContainer";
import { Cell } from "../redux/Cell";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./CodeCell.css";

export interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles![cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <ResizableContainer direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </ResizableContainer>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview errorMessage={bundle!.error} bundledCode={bundle!.code} />
          )}
        </div>
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
