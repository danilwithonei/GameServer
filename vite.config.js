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
