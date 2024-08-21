const fs = require("fs");
const path = require("path");
const ConfigParser = require('cordova-common').ConfigParser;

const pluginId = "cordova-outsystems-uaepass";

function replaceFile(toreplace, regex, filepath) {
    try {
        const content = fs.readFileSync(filepath, "utf8");
        if (!content.includes(toreplace)) {
            if (typeof content === "string") {
                const updatedContent = content.replace(regex, toreplace);
                fs.writeFileSync(filepath, updatedContent);
                console.log("Changed " + path.basename(filepath) + "!");
            } else {
                console.error(filepath + " could not be retrieved!");
            }
        } else {
            console.log(toreplace + " already exists in " + path.basename(filepath));
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error("File not found:", filepath);
        } else {
            console.error("Error reading or writing file:", err);
        }
    }
}

module.exports = function(context) {
    console.log("Changing Copy Resources Script!");

    const config = new ConfigParser("config.xml");
    const appName = config.name();

    const pathPodResources = path.join(
        context.opts.projectRoot,
        "platforms",
        "ios",
        "Pods",
        "Target Support Files",
        "Pods-" + appName,
        "Pods-" + appName + "-resources.sh"
    );

    // Check if the Pod Resources script exists before attempting to replace
    if (fs.existsSync(pathPodResources)) {
        replaceFile(
            "${PODS_ROOT}/../www/UAEPassClient/UAEPassClient/ViewControllers/UAEPassWebViewController.xib",
            /\${BUILT_PRODUCTS_DIR.*UAEPassWebViewController\.nib/g,
            pathPodResources
        );
    } else {
        console.error("Pod resources script not found at:", pathPodResources);
    }

    console.log("Fixed Copy Resources Script!");
};
