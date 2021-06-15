import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler/bundler";
import ResizableContainer from "./ResizableContainer";
import { Cell } from "../redux/Cell";
import { useActions } from "../hooks/useActions";

export interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setError] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle({ "index.js": cell.content });
      setCode(output.code);
      setError(output.err);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

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
        <Preview errorMessage={err} bundledCode={code} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
