import ReactDOM from "react-dom";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState({
    "message.js": 'module.exports = "Hello World!"',
    "index.js": "",
  });

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    iframe.current.srcdoc = html;

    //console.log(ref.current);
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    //setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">
          <script> 
            window.addEventListener('message', (event) => {
              console.log(event);
              try{
                eval(event.data);
              }catch(err){
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err+ '</div>';
              }
            }, false)
          </script>
        </div>
      </body>
    </html>`;
  return (
    <div>
      <CodeEditor
        initialValue="const a =1;"
        onChange={(value) => {
          setInput({ ...input, "index.js": value });
        }}
      />
      <textarea
        value={input["index.js"]}
        onChange={(e) => {
          setInput({ ...input, "index.js": e.target.value });
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="display"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      ></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
