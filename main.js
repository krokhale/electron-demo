const { app,ipcMain, BrowserWindow } = require('electron')

ipcMain.on('new-window', (event, arg) => {
    createWindow(800, 800, 'http://localhost:3001/meeting');
})

let mainWindow;
function createWindow (width, height, url) {
    // Create the browser window.
    let options = {
        width: width || 1024,
        height: height || 768 ,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            preload: ''
        },
        // frame: false
        // titleBarStyle: 'hidden'
        titleBarStyle: 'hiddenInset'
        // titleBarStyle: 'customButtonsOnHover', frame: false
        // titleBarStyle: 'hidden', frame: false
        // transparent: true, frame: false
    };
    if(mainWindow){
        options.parent = mainWindow;
    }
    let win = new BrowserWindow(options);
    if(!mainWindow){
        mainWindow = win;
    }

    // and load the index.html of the app.
    // win.loadFile('index.html')
    win.loadURL(url || 'http://localhost:3001');
    // Open the DevTools.
    // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
