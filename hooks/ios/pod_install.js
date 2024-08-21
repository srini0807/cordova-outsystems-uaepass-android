#!/usr/bin/env node

var exec = require('child_process').exec;
var path = require('path');

var projectRoot = process.argv[2];

function runPodInstall() {
    exec('pod install', { cwd: path.join(projectRoot, 'platforms/ios') }, function (error, stdout, stderr) {
        if (error) {
            console.error('Error running pod install: ' + error);
            process.exit(1);
        }
        console.log(stdout);
        console.error(stderr);
    });
}

runPodInstall();
