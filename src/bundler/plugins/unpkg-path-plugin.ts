import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^[^.][^/].*\.js)$/ }, (args: any) => {
        //Use this for serving base file
        //console.log("ON RESOLVE");
        //console.log(
        // "Found a path that doesnt contain ./ or ../ and contains .js"
        //);
        //console.log(args);
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /(^[^.][^/].*\.css)$/ }, (args: any) => {
        //Use this for serving base file
        //console.log("ON RESOLVE");
        //console.log(
        // "Found a path that doesnt contain ./ or ../ and contains css"
        //);
        //console.log(args);
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /(^\.\/[^/]*\.css)$/ }, (args: any) => {
        //Use this for serving base file
        //console.log("ON RESOLVE");
        //console.log(
        //  "found a .css starting with ./ and no / in the middle and ending with css"
        //);
        //console.log(args);
        return { path: args.path.substring(2), namespace: "a" };
      });

      build.onResolve({ filter: /^\.\// }, async (args: any) => {
        //console.log("Found a ./ in required");
        //check if local import from unpkg
        if (!args.importer.includes("https://unpkg.com")) {
          //Assume only import js files
          return {
            namespace: "a",
            path: args.path.substring(2) + ".js",
          };
        }
        return null;
      });
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
