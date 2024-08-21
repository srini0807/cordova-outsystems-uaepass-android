// hooks/android/enableAndroidX.js
const fs = require('fs');
const path = require('path');

module.exports = function(ctx) {
    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    const gradlePropertiesPath = path.join(platformRoot, 'gradle.properties');

    if (fs.existsSync(gradlePropertiesPath)) {
        let gradleProperties = fs.readFileSync(gradlePropertiesPath, 'utf-8');

        if (!gradleProperties.includes('android.useAndroidX=true')) {
            gradleProperties += '\nandroid.useAndroidX=true';
        }

        if (!gradleProperties.includes('android.enableJetifier=true')) {
            gradleProperties += '\nandroid.enableJetifier=true';
        }

        fs.writeFileSync(gradlePropertiesPath, gradleProperties, 'utf-8');
        console.log('AndroidX and Jetifier enabled in gradle.properties');
    } else {
        console.error('gradle.properties file not found at: ', gradlePropertiesPath);
    }
};
