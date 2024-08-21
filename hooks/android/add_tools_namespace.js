module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var manifestContent = fs.readFileSync(manifestPath, 'utf-8');

    if (!manifestContent.includes('xmlns:tools="http://schemas.android.com/tools"')) {
        manifestContent = manifestContent.replace('<manifest', '<manifest xmlns:tools="http://schemas.android.com/tools"');
        fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
    }
};
