import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler/bundler";
import ResizableContainer from "./ResizableContainer";

const CodeCell = () => {
  const [input, setInput] = useState({
    "message.js": 'module.exports = "Hello World!"',
    "index.js": "",
  });
  const [code, setCode] = useState("");
  const [err, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.err);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <ResizableContainer direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <ResizableContainer direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput({ ...input, "index.js": value })}
          />
        </ResizableContainer>
        <Preview errorMessage={err} bundledCode={code} />
      </div>
    </ResizableContainer>
  );
};

export default CodeCell;
