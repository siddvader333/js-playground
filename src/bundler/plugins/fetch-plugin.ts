/*Use this plugin to handle file fetching (e.g. from npm) */
import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import { Cell } from "../../redux/Cell";

const showFunction = `
//import _React from 'react';
//import _ReactDOM from 'react-dom';
var show = (value) =>{
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

const fileCache = localForage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (inputObject: any, fileToRun: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^[^.][^/].*\.js)$/ }, async (args: any) => {
        //console.log("ON LOAD");
        //console.log("found a .js file without ./ or ../", args.path);
        //console.log(args);

        for (const [key, value] of Object.entries(inputObject)) {
          if ((value as Cell).fileName === args.path) {
            //console.log("found a file with matching path name");
            return {
              loader: "jsx",
              contents: (value as Cell).content,
            };
          }
        }
      });

      build.onLoad({ filter: /(^[^.][^/].*\.css)$/ }, async (args: any) => {
        //console.log("ON LOAD");
        //console.log(
        //  "found a .css starting with no ./ and no ../  ending with css"
        //);
        for (const [key, value] of Object.entries(inputObject)) {
          if ((value as Cell).fileName === args.path) {
            //console.log("found a file with matching path name");
            //console.log((value as Cell).content);
            const data = (value as Cell).content;
            const escapedCss = data
              .replace(/\n/g, "")
              .replace(/""/g, '\\"')
              .replace(/'/g, "\\'");
            const contents = `
              const style = document.createElement('style');
              style.innerText = \`${escapedCss}\`;
              document.head.appendChild(style);
              `;

            const result: esbuild.OnLoadResult = {
              loader: "jsx",
              contents: contents,
            };
            return result;
          }
        }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        //console.log("onLoad", args);
        const { data, request } = await axios.get(args.path);

        const escapedCss = data
          .replace(/\n/g, "")
          .replace(/""/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escapedCss}';
        document.head.appendChild(style);
        `;
        //console.log(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //console.log("onLoad", args);
        if (args.path.includes("https://unpkg.com")) {
          //get package from unpkg if that is the requested path
          const { data, request } = await axios.get(args.path);
          //console.log(args.path);
          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, result);
          return result;
        } else {
          /*Look for a "local" file*/
          //console.log("look for a local file");
          //console.log(args.path);
          //console.log(inputObject[args.path]);
          return {
            loader: "jsx",
            contents: inputObject[args.path],
          };
        }
      });
    },
  };
};
