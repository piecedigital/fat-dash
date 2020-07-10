var electron = require("electron");
var ipcRenderer = electron.ipcRenderer;

function makeDataTransfer(stats) {
    var files = stats.map(makeFile);

    var dt = new DataTransfer();
    files.map(function(file) {
        dt.items.add(file);
    });

    var input = document.createElement("input");
    input.type = "file";
    input.files = dt.files;

    return dt;
}

function makeFile(fileData) {
    return new File([fileData.data], fileData.name, {
        type: "text/plain",
    });
}

ipcRenderer.on("new-stats", function(event, stats) {
    if (stats.length === 0) return;

    loadStats(makeDataTransfer(stats));
});

setInterval(function() {
    console.log("retrieving newest stats");
    ipcRenderer.send("get-new-stats");
}, 5 * 1000);
ipcRenderer.send("get-new-stats");

function loadStats(dt) {
    var anchor = Array.from(document.querySelectorAll("input[accept='.csv'"))
        .pop()
        .parentElement
        .querySelector("a")
        .click();

    var holder = Array.from(document.querySelectorAll("input[accept='.csv'"))
        .shift().parentElement.parentElement;

    holder.ondrop({
        dataTransfer: dt,
        preventDefault: function () {},
        stopPropagation: function () {}
    });
}
