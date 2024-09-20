# Web pack demo

Tutorial can be found here
https://webpack.js.org/guides/getting-started/


# Dependencies
### webpack
`npm install webpack webpack-cli --save-dev`

### lodash
`npm install --save lodash`

### CSS loader
`npm install --save-dev style-loader css-loader`



## Run
To run the app using default no config use the following command
`npx webpack`

The command above will pack the application with its dependencies. It will take the index.js file and create the main.js file on the dist folder which is what the index html file needs
```
asset main.js 69.5 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1010 bytes 5 modules
cacheable modules 532 KiB
  ./src/index.js 228 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
```
Webpack will take the application and convert onto old JS code so most of the browsers should support it.

To run the app using custom config file use the following command
`npx webpack --config webpack.config.js`

The command above will run the app but with the custom config
```
asset main.js 69.5 KiB [compared for emit] [minimized] (name: main) 1 related asset
runtime modules 1010 bytes 5 modules
cacheable modules 532 KiB
  ./src/index.js 228 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
```



### Adding the build script to the package json file so we can use npm to run webpack
```json
{
  "scripts": {
    "build": "webpack"
  }
}
```
Now to run the app we can simply type
`npm run build`
