const { app, BrowserWindow } = require('electron');

let win;

async function createWindow () {
	// create and config browser window
	win = new BrowserWindow({
		width: 1366, 
		height: 768,
		webPreferences: {
            nodeIntegration: true
        }
	});

	// load webpage and check development states
  	win.loadURL("http://localhost:3000");
	// on close clicked
	win.on('closed', () => win = null);
	// enable Chromes development tools
    win.webContents.openDevTools({mode:'detach'});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  if (win === null)
    createWindow();
});