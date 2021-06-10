/*Use this plugin to handle file fetching (e.g. from npm) */
import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (inputObject: any) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: inputObject["index.js"],
        };
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
        console.log("onLoad", args);
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
          console.log("look for a local file");
          console.log(args.path);
          console.log(inputObject[args.path]);
          return {
            loader: "jsx",
            contents: inputObject[args.path],
          };
        }
      });
    },
  };
};
