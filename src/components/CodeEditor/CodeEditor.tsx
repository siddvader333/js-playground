import "./CodeEditor.css";
import "../syntax.css";
import { useRef, useState } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import JSparser from "prettier/parser-babel";
import CSSParser from "prettier/parser-postcss";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import { FileTypes } from "../../redux/Cell";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  fileType: FileTypes | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue,
  fileType,
}) => {
  const editorRef = useRef<any>();
  const [editorHeight, setEditorHeight] = useState(10 * 19);

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
      /*Resize editor height */
      const numLines = editorRef.current.getModel().getLineCount();
      if (numLines > 20) {
        setEditorHeight(20 * 19);
      } else if (numLines < 10) {
        setEditorHeight(10 * 19);
      } else {
        setEditorHeight(numLines * 19);
      }
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  const onFormatClick = () => {
    try{
      const rawCode = editorRef.current.getModel().getValue();

      const prettyCode = prettier
        .format(rawCode, {
          parser: fileType === ".css" ? "css" : "babel",
          plugins: [fileType === ".css" ? CSSParser : JSparser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");

      editorRef.current.setValue(prettyCode);
    }catch(error){
      console.log("Formatting error");
      console.log(error.message);
    } 
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-white is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="vs-dark"
        language={fileType === ".css" ? "css" : "javascript"}
        height={editorHeight + "px"}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 13,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
