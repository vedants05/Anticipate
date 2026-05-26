// Patches expo-modules-jsi's build-xcframework.sh to remove the
// -disableAutomaticPackageResolution flag from its nested xcodebuild call.
//
// Root cause: the flag requires an existing .swiftpm/workspace-state.json.
// In CI, EAS re-runs npm ci in a UUID-keyed temp dir every build, so no
// workspace state ever exists. For a package with dependencies:[], automatic
// resolution is a no-op (nothing to fetch), so removing the flag is safe and
// directly unblocks the build.
const path = require('path');
const fs = require('fs');

function setup() {
  if (process.platform !== 'darwin') return;

  const scriptPath = path.join(
    __dirname, '..', 'node_modules', 'expo-modules-jsi',
    'apple', 'scripts', 'build-xcframework.sh'
  );
  if (!fs.existsSync(scriptPath)) return;

  const original = fs.readFileSync(scriptPath, 'utf8');
  const patched = original.replace(
    /^    -disableAutomaticPackageResolution \\\n/m,
    ''
  );

  if (patched === original) {
    // Flag already removed (re-entrant call or future version changed the script)
    return;
  }

  fs.writeFileSync(scriptPath, patched);
  console.log('[setup-ios] Patched build-xcframework.sh: removed -disableAutomaticPackageResolution');
}

setup();
