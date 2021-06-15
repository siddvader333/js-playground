import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
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
        <div className="text-editor card">
          <div className="card-content">
            <MDEditor
              value={value}
              onChange={(textValue) => {
                setValue(textValue!);
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="text-editor card"
          ref={ref}
          onClick={() => {
            setEditing(true);
          }}
        >
          <div className="card-content">
            <MDEditor.Markdown source={""} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
