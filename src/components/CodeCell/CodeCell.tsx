import { useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import ResizableContainer from "../ResizableContainer/ResizableContainer";
import { Cell } from "../../redux/Cell";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./CodeCell.css";

export interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
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
    <ResizableContainer direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {cell.fileType === ".js" ? (
          <>
            <ResizableContainer direction="horizontal">
              <CodeEditor
                initialValue={cell.content}
                onChange={(value) => updateCell(cell.id, value)}
                fileType={cell.fileType}
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
                <Preview
                  errorMessage={bundle.error}
                  bundledCode={bundle.code}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
              fileType={cell.fileType}
            />
          </>
        )}
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
