
# react-native-root-check

## Getting started

`$ npm install react-native-root-check --save`

### Mostly automatic installation

`$ react-native link react-native-root-check`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-root-check` and add `RNRootCheck.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRootCheck.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRootCheckPackage;` to the imports at the top of the file
  - Add `new RNRootCheckPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-root-check'
  	project(':react-native-root-check').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-root-check/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-root-check')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRootCheck.sln` in `node_modules/react-native-root-check/windows/RNRootCheck.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Root.Check.RNRootCheck;` to the usings at the top of the file
  - Add `new RNRootCheckPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRootCheck from 'react-native-root-check';

// TODO: What to do with the module?
RNRootCheck;
```
  