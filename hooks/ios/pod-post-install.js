#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var podfilePath = path.join(context.opts.projectRoot, 'platforms', 'ios', 'Podfile');

    if (fs.existsSync(podfilePath)) {
        var podfileContent = fs.readFileSync(podfilePath, 'utf8');

        if (!podfileContent.includes('post_install do |installer|')) {
            var postInstallScript = `
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES'] = 'YES'
      config.build_settings['LD_RUNPATH_SEARCH_PATHS'] = ['$(inherited)', '@executable_path/Frameworks']
    end
  end
end
            `;

            fs.appendFileSync(podfilePath, postInstallScript);
        }
    }
};
