import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "node:path";

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  //ukuran window di TBG2 wsl windows 11 dengan scale 125%
  const winHeight = height - 100;
  const winWidth = 430;
  const posX = width - winWidth - 10;

  const win = new BrowserWindow({
    minHeight: winHeight - 40,
    minWidth: winWidth,
    width: winWidth,
    height: winHeight,
    x: posX,
    y: 0,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), "src/electron/preload.cjs"),
    },
  });

  win.loadFile("dist-react/index.html");
  console.log("window Height: " + height);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close-app", () => {
  setTimeout(() => {
    app.quit();
  }, 3000);
});
