# React Native Multi-Flavor Android and iOS App

This project supports multiple environments (**dev**, **stage**, **live**, and **root**) via product flavors, environment-specific `.env` files, and CI/CD automation using GitHub Actions.

---

## 🚀 Setup Instructions

### 📱 Android Setup

### 1. **Clone the repository**

```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. **Install dependencies**

```sh
yarn install
# or
npm install
```

### 3. **Configure Environment Variables**

The project uses [`react-native-config`](https://github.com/luggit/react-native-config) to manage environment variables for different flavors.

#### Create these files in your project root:

* `.env` (for root flavor)
* `.env.dev` (for dev flavor)
* `.env.stage` (for stage flavor)
* `.env.live` (for live flavor)

Each file contains environment-specific variables, e.g.:

```
API_URL=https://api.dev.example.com
APP_NAME=ReactFlavorsDev
```

### 4. **Gradle Setup for Flavors**

#### In your `android/app/build.gradle` file:

```groovy
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"

project.ext.envConfigFiles = [
    root: ".env",
    dev: ".env.dev",
    stage: ".env.stage",
    live: ".env.live",
]

flavorDimensions "default"

productFlavors {
    root {
        dimension "default"
        applicationId "com.testing_33"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        resValue "string", "build_config_package", "com.testing_33"
        versionCode 1
        versionName "1.0"
    }
    dev {
        dimension "default"
        applicationId "com.reactflavors.dev"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        resValue "string", "build_config_package", "com.reactflavors"
        versionCode 1
        versionName "1.0"
    }
    stage {
        dimension "default"
        applicationId "com.reactflavors.stage"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        resValue "string", "build_config_package", "com.reactflavors"
        versionCode 1
        versionName "1.0"
    }
    live {
        dimension "default"
        applicationId "com.reactflavors.live"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        resValue "string", "build_config_package", "com.reactflavors"
        versionCode 1
        versionName "1.0"
    }
}
```

### 5. **Change App Name & Icon per Flavor**

1. Duplicate the `android/app/src/main` folder to:

   * `src/dev`
   * `src/stage`
   * `src/live`
2. In each flavor folder, update:

   * **App icon:** Replace icon assets (in `res/`) with flavor-specific icons.
   * **App name:** Edit `res/values/strings.xml` to set the name for each flavor.

**Release Builds:**

```sh
# Root
npm run root-build-android

# Dev
npm run dev-build-android

# Stage
npm run stage-build-android

# Live
npm run live-build-android
```

**Generate AAB for Play Store (Live flavor):**

```sh
npm run android-prod-release-aab
```

---

## 🍏 iOS Setup

### 1. Open Xcode

### 2. Create Targets

* Create different targets named `MyApp-DEV`, `MyApp-Stage`, and `MyApp-Live`.
* Rename each new target's Info.plist accordingly (e.g., `reactFlavors-Dev-Info.plist`).

### 3. Configure Info.plist

* Select each target.
* Go to **Build Settings** and search `info.plist.file`.
* Ensure each target points to the correct flavor-specific Info.plist file.

### 4. Manage Schemes

* Select **Product > Scheme > Manage Schemes**.
* Create schemes matching each flavor.
* For each scheme, select **Product > Scheme > Edit Scheme**.
* In the **Build > Pre-actions** tab, add a new run script action with:

```sh
echo ".env.dev" > /tmp/envfile
# Repeat for each flavor accordingly
echo ".env.stage" > /tmp/envfile
```

### 5. Update Podfile

In `ios/Podfile`:

```ruby
target 'MyApp-Dev' do
  inherit! :complete
end

target 'MyApp-Stage' do
  inherit! :complete
end

target 'MyApp-Live' do
  inherit! :complete
end
```

### 6. Install Pods

```sh
gem install bundler
bundle install
bundle exec pod install
```

### 7. Update App Name

* Select each target and go to **General > Info**.
* Change **Bundle Display Name** according to each flavor.

### 8. Update App Icon

* In Xcode, navigate to your workspace/project assets.
* Add new image assets for each flavor.
* Rename asset files according to each flavor.
* For each target, go to **General > App Icon and Launch Screen** and select the appropriate icon asset.

### 9. Running & Building for Each Flavor (iOS)

**Run in Simulator:**

```sh
npm run dev-ios
npm run stage-ios
npm run live-ios
npm run root-ios
```

**Generate unsigned .app build:**

```sh
npm run dev-build-ios
npm run stage-build-ios
npm run live-build-ios
npm run root-build-ios
```

**Install .app file on Simulator:**

```sh
xcrun simctl install booted /path/to/MyApp.app
```

## ⚙️ CI/CD with GitHub Actions

* CI/CD is configured via workflow files in `.github/workflows/`.
* On every push to `dev-flight`, `staging-flight`, or `main` branches:

  * The appropriate flavor build is triggered.
  * APK files are generated and uploaded as artifacts for download.
* Environment-specific `.env` files are automatically injected in the build process.

### **Download Build Artifacts**

1. Go to your repo’s **Actions** tab on GitHub.
2. Select the relevant workflow run.
3. Download the APK file from the workflow’s artifacts section.

---

## 🛠️ Additional Notes

* Make sure `gradlew`, `gradlew.bat`, and all files under `android/gradle/wrapper/` are **committed** to your repo for builds to succeed in CI/CD.
* Do **not** commit the `.gradle/` or `android/build/` directories.
* Keep your environment variables **secure**; don’t commit sensitive values.
* Ensure you include the script action; otherwise, the project will default to using the .env file across all flavors.


