import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { useActions } from "../hooks/useActions";
import { Cell } from "../redux/Cell";
import "./TextEditor.css";

export interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !(
          ref.current &&
          event.target &&
          ref.current.contains(event.target as Node)
        )
      ) {
        setEditing(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div>
      {editing ? (
        <div className="text-editor" ref={ref}>
          <MDEditor
            value={cell.content}
            onChange={(value) => updateCell(cell.id, value!)}
          />
        </div>
      ) : (
        <div className="text-editor card" onClick={() => setEditing(true)}>
          <div className="card-content">
            <MDEditor.Markdown source={cell.content || "Click to edit"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
