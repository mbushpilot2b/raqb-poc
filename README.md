# Semantic Health Notes
This repo contians changes to update the react-aweseome-query-builder package needed in order for additional advanced filter querying capabilities such as:
- contains
- starts with
- ends with
- changing the labels of operators
- changing a type to use a different AntD component

### Patch-Package
Using https://github.com/ds300/patch-package.
This creates files in the patches folder that contain changes to any node module packages.
As such, these files contain the changes to React Aweseom Query Builder.
The postinstall script in package.json will apply the patches on yarn install in any new branch.
If the patches are not being applied see https://github.com/ds300/patch-package#why-use-postinstall-postinstall-with-yarn

### Run the app
Install pnpm `npm install -g pnpm`
Start the app `pnpm start`

# @react-awesome-query-builder/examples

[![npm](https://img.shields.io/npm/v/@react-awesome-query-builder/examples.svg)](https://www.npmjs.com/package/@react-awesome-query-builder/examples)

Demo app, uses local library with hot reload.  
This app uses AntDesign widgets.  
Uses complex config to demonstrate anvanced usage.  
**Uses TypeScript.**

### Preview
https://ukrbublik.github.io/react-awesome-query-builder/

### Run
From the root of cloned repository:
```sh
pnpm start
```

And open `http://localhost:3001` in a browser.  
Feel free to play with code in `demo` dir.  

### Run in sandbox
[![Open in codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/ukrbublik/react-awesome-query-builder/tree/master/packages/examples?file=/demo/index.tsx)
(if it freezes on "Initializing Sandbox Container" please click "Fork")

[![Open in stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/ukrbublik/react-awesome-query-builder/tree/master?file=packages%examples%2Fdemo%2Findex.tsx)
(installing dependencies can take a while)
