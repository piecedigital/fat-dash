var electron = require("electron");
var regedit = require("regedit");
var vdf = require("node-vdf");
var fs = require("fs");

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
// var statsDir = "D:/Users/trash/Documents/SteamLibrary/steamapps/common/FPSAimTrainer/FPSAimTrainer/stats";
var statsDir = "";

var regkey = "HKLM\\SOFTWARE\\Wow6432Node\\Valve\\Steam";
regedit.arch.list32(regkey, function(err, result) {
    if (err) {
        return console.error(err);
    }

    var steamDir = result[regkey].values.InstallPath.value;
    var gameId = "824270";
    var vdfFile;
    try {
        vdfFile = fs.readFileSync(steamDir + "/steamapps/libraryfolders.vdf", { encoding: "utf-8" });
    } catch(e) {
        throw e;
    }

    var vdfParsed = vdf.parse(vdfFile);
    var appDirs = [];

    Object.keys(vdfParsed.LibraryFolders).map(function(key) {
        if (key.match(/^\d+/)) {
            appDirs.push(vdfParsed.LibraryFolders[key]);
        }
    });

    var acfFile;
    var commonAppDir;
    for (let index = 0; index < appDirs.length; index++) {
        const appDir = appDirs[index];

        try {
            acfFile = fs.readFileSync(appDir + "/steamapps/appmanifest_" + gameId + ".acf", { encoding: "utf-8" });
        } catch(e) {}

        if (acfFile) {
            commonAppDir = appDir;
            break;
        }
    }

    var acfParsed;
    if (acfFile) {
        acfParsed = vdf.parse(acfFile);
        var appFolder = acfParsed.AppState.installdir;
        statsDir = commonAppDir + "/steamapps/common/" + appFolder + "/FPSAimTrainer/stats";
    }
});

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
    win.loadURL(PROTOCOL + ":///" + "index.html");
    win.webContents.openDevTools();

    // get stats
    var newestFiles = [];

    ipcMain.on("get-new-stats", function(event) {
        event.reply("new-stats", newestFiles);
        newestFiles = [];
    });

    function startFeedingData() {
        function fileChange(eventType, filename) {
            if (!filename) return;

            switch(filename) {
                case ".":
                case "..":
                case undefined:
                    break;
                default:
                    fs.readFile(statsDir + "/" + filename, { encoding: "utf-8" }, function(err, data) {
                        if (err) return;

                        newestFiles.push({
                            name: filename,
                            path: statsDir + "/" + filename,
                            data: data
                        });
                    });
            }
        }

        function handleDir(err, files) {
            if (err) return console.error(err)

            files.map(function(file) {
                fileChange(null, file.name);
            });
        }

        fs.watch(statsDir, fileChange);
        fs.readdir(statsDir, {
            withFileTypes: true
        }, handleDir);
    }

    var interval = setInterval(function() {
        if (statsDir) {
            clearInterval(interval);
            startFeedingData();
        }
    }, 1000);
}

app.on("ready", createWindow, 2000);
