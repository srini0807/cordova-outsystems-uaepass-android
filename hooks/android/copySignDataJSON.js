var path = require("path");
var fs = require("fs");

function copyFromSourceToDestPath(defer, sourcePath, destPath) {
    fs.createReadStream(sourcePath).pipe(fs.createWriteStream(destPath))
    .on("close", function () {
        defer.resolve();
    })
    .on("error", function (err) {
        console.log(err);
        defer.reject();
    });
}

module.exports = function(context) {
    var defer = require("q").defer();

    var pathSignData = path.join(
        context.opts.projectRoot,
        "platforms",
        "android",
        "app",
        "src",
        "main",
        "assets",
        "signData.json"
    );

    var pathAssetSignData = path.join(
        context.opts.plugin.dir,
        "src",
        "signData.json"
    );

    // Check if source file exists before attempting to copy
    if (!fs.existsSync(pathAssetSignData)) {
        console.error("Source file signData.json not found at path:", pathAssetSignData);
        defer.reject(new Error("signData.json file missing"));
        return defer.promise;
    }

    // Proceed with the file copy if it doesn't already exist at the destination
    if (!fs.existsSync(pathSignData)) {
        copyFromSourceToDestPath(defer, pathAssetSignData, pathSignData);
    } else {
        defer.resolve();
    }

    return defer.promise;
};
