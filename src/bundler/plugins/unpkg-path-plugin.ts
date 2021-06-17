import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^[^.][^/].*\.js)$/ }, (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /(^[^.][^/].*\.css)$/ }, (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      build.onResolve({ filter: /(^\.\/[^/]*\.css)$/ }, (args: any) => {
        return { path: args.path.substring(2), namespace: "a" };
      });

      build.onResolve({ filter: /^\.\// }, async (args: any) => {
        if (!args.importer.includes("https://unpkg.com")) {
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
