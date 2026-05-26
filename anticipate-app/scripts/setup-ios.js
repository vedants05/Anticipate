// Pre-creates the SPM workspace-state.json for expo-modules-jsi so that
// the `Build ExpoModulesJSI xcframework` Xcode build phase doesn't fail
// with "Could not resolve package dependencies".
//
// Root cause: the build phase script uses -disableAutomaticPackageResolution,
// which requires an existing workspace-state.json. In CI, EAS re-runs npm ci
// in a fresh temp dir, so the file is never there. Running swift package
// resolve here (during the npm lifecycle) creates it in the right place.
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function setup() {
  if (process.platform !== 'darwin') return;

  const jsiDir = path.join(__dirname, '..', 'node_modules', 'expo-modules-jsi', 'apple');
  if (!fs.existsSync(jsiDir)) return;

  const swiftpmDir = path.join(jsiDir, '.swiftpm');
  const stateFile = path.join(swiftpmDir, 'workspace-state.json');
  if (fs.existsSync(stateFile)) return;

  fs.mkdirSync(swiftpmDir, { recursive: true });

  try {
    execSync('swift package resolve', {
      cwd: jsiDir,
      env: { ...process.env, PODS_ROOT: '/tmp', RN_ROOT: '/tmp' },
      stdio: 'pipe',
    });
    console.log('[setup-ios] ExpoModulesJSI SPM workspace pre-resolved');
  } catch (_) {
    // swift unavailable or wrong version — write a minimal valid state directly.
    // For a package with dependencies:[], this is always the correct content.
    const emptyState = {
      object: {
        artifacts: [],
        dependencies: [],
        identityResolver: { kind: 'default' },
        mirrors: [],
        packages: [],
        pins: [],
        version: 6,
      },
      version: 6,
    };
    fs.writeFileSync(stateFile, JSON.stringify(emptyState, null, 2) + '\n');
    console.log('[setup-ios] ExpoModulesJSI SPM workspace state initialized (fallback)');
  }
}

setup();
