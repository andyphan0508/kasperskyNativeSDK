
# react-native-root-checker

## Getting started

`$ npm install react-native-root-checker --save`

### Mostly automatic installation

`$ react-native link react-native-root-checker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-root-checker` and add `RNRootChecker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRootChecker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRootCheckerPackage;` to the imports at the top of the file
  - Add `new RNRootCheckerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-root-checker'
  	project(':react-native-root-checker').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-root-checker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-root-checker')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRootChecker.sln` in `node_modules/react-native-root-checker/windows/RNRootChecker.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Root.Checker.RNRootChecker;` to the usings at the top of the file
  - Add `new RNRootCheckerPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRootChecker from 'react-native-root-checker';

// TODO: What to do with the module?
RNRootChecker;
```
  