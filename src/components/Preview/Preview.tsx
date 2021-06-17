import "./preview.css";
import { useRef, useEffect } from "react";

export interface PreviewProps {
  bundledCode: string;
  errorMessage: string;
}
const showFunction = `
//import _React from 'react';
//import _ReactDOM from 'react-dom';
const show = (value) =>{
  const root = document.querySelector("#root");
  if(typeof value === 'object'){
    if(value.$$typeof && value.props){
      ReactDOM.render(value, root);
    }else{         
      root.innerHTML = JSON.stringify(value);
    }
  }else {
    root.innerHTML = value;
  }
}`;
const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) =>{
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
          window.addEventListener('error', (event) =>{
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);

            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ bundledCode, errorMessage }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(bundledCode, "*");
    }, 50);
  }, [bundledCode]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {errorMessage && <div className="bundle-error">{errorMessage}</div>}
    </div>
  );
};

export default Preview;
