/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const path = require("path");
function createWindow() {
    const win = new BrowserWindow({
        width: 648,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.loadFile("dist/index.html");
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
