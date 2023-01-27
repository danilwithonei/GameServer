// vite.config.js
const { resolve } = require("path");

module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "/views/html/index.html"),
                rooms: resolve(__dirname, "/views/html/roomsPage.html"),
                game: resolve(__dirname, "/views/html/gamePage.html"),
            },
        },
    },
};

// import { defineConfig, loadEnv } from "vite";

// export default ({ mode }) => {
//     // Load app-level env vars to node-level env vars.
//     process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

//     return defineConfig({
//         // To access env vars here use process.env.TEST_VAR
//     });
// };
