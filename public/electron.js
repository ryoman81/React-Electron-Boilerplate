const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

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
  	win.loadURL( isDev ? 
  		"http://localhost:3000" : 
  		`file://${path.join(__dirname, '../build/index.html')}`
  	);

  	win.on('closed', () => {
  		win = null;
  	});

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