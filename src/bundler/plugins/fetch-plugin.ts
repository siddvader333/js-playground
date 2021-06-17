/*Use this plugin to handle file fetching (e.g. from npm) */
import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import { Cell } from "../../redux/Cell";

const fileCache = localForage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (inputObject: any) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^[^.][^/].*\.js)$/ }, async (args: any) => {
        for (const value of Object.values(inputObject)) {
          if ((value as Cell).fileName === args.path) {
            return {
              loader: "jsx",
              contents: (value as Cell).content,
            };
          }
        }
      });

      build.onLoad({ filter: /(^[^.][^/].*\.css)$/ }, async (args: any) => {
        for (const value of Object.values(inputObject)) {
          if ((value as Cell).fileName === args.path) {
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
        if (args.path.includes("https://unpkg.com")) {
          //get package from unpkg if that is the requested path
          const { data, request } = await axios.get(args.path);
          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, result);
          return result;
        } else {
          return {
            loader: "jsx",
            contents: inputObject[args.path],
          };
        }
      });
    },
  };
};
