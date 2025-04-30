import { spawn } from "child_process";
import safelistConfig from "./purgecss-safelist.js";

const safelist = safelistConfig.safelist.map((item) =>
   typeof item === "object" ? JSON.stringify(item) : item
);

const args = [
   "--css", "dist/scripts/css/*.css",
   "--content", "dist/**/*.html", "dist/**/*.php", "dist/**/*.js",
   "--output", "dist/scripts/css/",
   "--safelist", ...safelist
];

const purgeProcess = spawn("purgecss", args, { stdio: "inherit", shell: true });

purgeProcess.on("close", (code) => {
   if (code === 0) {
      console.log("Build Complete & CSS Purged 👍");
   } else {
      console.error(`PurgeCSS failed with exit code ${code}`);
   }
});
