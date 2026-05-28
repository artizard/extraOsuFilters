import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest((env) => {
  const isFirefox = env.mode === "firefox";
  return {
    manifest_version: 3,
    name: "Extra osu! Filters",
    version: pkg.version,
    description: "Adds extra filters to the Osu! website's beatmap search.",
    icons: {
      16: "public/icon-16.png",
      32: "public/icon-32.png",
      48: "public/icon-48.png",
      128: "public/icon-128.png",
    },
    content_scripts: [
      {
        js: ["src/content/content.tsx"],
        matches: ["https://osu.ppy.sh/*"],
      },
    ],
    ...(isFirefox && {
      browser_specific_settings: {
        gecko: {
          id: "osu-extra-filters@extension.com",
          strict_min_version: "109.0",
          data_collection_permissions: {
            required: [],
          },
        },
      },
    }),
  };
});
