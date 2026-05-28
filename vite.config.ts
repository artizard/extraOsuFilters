import path from "node:path";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import zip from "vite-plugin-zip-pack";
import manifest from "./manifest.config.js";
import { name, version } from "./package.json";

export default defineConfig(({ mode }) => {
  const isFirefox = mode === "firefox";
  const targetBrowser = isFirefox ? "firefox" : "chrome";
  const distFolder = `dist/${targetBrowser}`;
  return {
    resolve: {
      alias: {
        "@": `${path.resolve(__dirname, "src")}`,
      },
    },
    build: {
      outDir: distFolder,
      emptyOutDir: true,
    },
    plugins: [
      react(),
      crx({ manifest }),
      zip({
        inDir: distFolder,
        outDir: "release",
        outFileName: `crx-${name}-${version}-${targetBrowser}.zip`,
      }),
    ],
    server: {
      cors: {
        origin: [/chrome-extension:\/\//],
      },
    },
  };
});
