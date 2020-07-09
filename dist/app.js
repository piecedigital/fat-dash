var electron = require("electron");
var fs = require("fs");

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;


function createWindow () {
    // source-1: https://github.com/electron/electron/issues/2242#issuecomment-299645388
    var PROTOCOL = 'file';

    electron.protocol.interceptFileProtocol(PROTOCOL, function (request, callback) {
        // Strip protocol
        let filepath = request.url;
        filepath = filepath.replace(PROTOCOL + ":///", "");
        filepath = (__dirname + "/assets/" + filepath).replace(/\\/g, "/");

        console.log(filepath);

        callback(filepath);
    });
    // end source-1

    // Create the browser window.
    var win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    // and load the index.html of the app.
    win.loadURL(PROTOCOL + ":///" + "nextpp/index.html");
    win.webContents.openDevTools();

    // get stats
    var statsDir = "D:/Users/trash/Documents/SteamLibrary/steamapps/common/FPSAimTrainer/FPSAimTrainer/stats";
    var newestFiles = [];
    fs.watch(statsDir, fileChange);

    function fileChange(eventType, file) {
        switch(file.name) {
            case ".":
            case "..":
            case undefined:
                break;
            default:
                fs.readFile(statsDir + "/" + file.name, {  }, function(err, data) {
                    if (err) return console.error(err)
                    newestFiles.push({
                        name: file.name,
                        path: statsDir + "/" + file.name,
                        data: data
                    });
                });
        }
    }

    function handleDir(err, files) {
        if (err) return console.error(err)

        files.map(function(file) {
            fileChange(null, file);
        });
    }

    fs.readdir(statsDir, {
        withFileTypes: true
    }, handleDir);

    ipcMain.on("get-new-stats", function(event) {
        event.reply("new-stats", newestFiles);
        newestFiles = [];
    });
}

app.on("ready", createWindow, 2000);
