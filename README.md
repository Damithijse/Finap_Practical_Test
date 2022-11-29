# Finap Practical Test - React Native

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure and core dependencies.

## Prerequisites 

+ Node.js > 16 and npm (Recommended: Use nvm)
+ Watchman
+ Xcode 13
+ JDK > 11
+ Android Studio and Android SDK

## Base dependencies

+ react-navigation navigation library.
+ redux for state management.
+ react-native-responsive-screen
+ react-native-modal
+ react-native-flash-message

## Folder structure

+ This template follows a very simple project structure:

- src: This folder is the main container of all the code inside your application.
- actions: This folder contains all actions that can be dispatched to redux.
- assets: Asset folder to store all images, vectors, etc.
- components: Folder to store any common component and screens that you use through your app (such as a footer)
- reducers: This folder should have all your reducers, and expose the combined result using its index.js
- App.js: Main component that starts your whole app.
- index.js: Entry point of your application as per React-Native standards.
