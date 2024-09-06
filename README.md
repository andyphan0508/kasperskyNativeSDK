## KASPERSKY NATIVE MODULE INSTRUCTION

This React Native modules created for local project. You need to configured manually for specific use case. In order work

### Configure the `modules` folder

The custom modules folder must be on the root project, for the native link to work. The project structures should be like this

```
|--android
|--ios
|--node_modules
|--modules
|   |--> react-native-kav-easyscanner
|   |--> react-native-root-checker
|--src
```

_This is the sample of the project structure_

### Configure the linking modules

If we install the module via e.g `@npm install <package-name> --save`. Since this project
