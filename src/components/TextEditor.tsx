import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div>
      {editing ? (
        <MDEditor />
      ) : (
        <div
          onClick={() => {
            setEditing(true);
          }}
        >
          <MDEditor.Markdown source={""} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
