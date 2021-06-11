import MonacoEditor, { EditorDidMount, monaco } from "@monaco-editor/react";
import parser from "prettier/parser-babel";
import prettier from "prettier";
import { useRef } from "react";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "./syntax.css";
import "./CodeEditor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      //@ts-ignore
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
    const rawCode = editorRef.current.getModel().getValue();

    const prettyCode = prettier
      .format(rawCode, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(prettyCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="dark"
        language="javascript"
        height="500px"
      />
    </div>
  );
};

export default CodeEditor;
