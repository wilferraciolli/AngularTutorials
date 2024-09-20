# Web pack demo

Tutorial can be found here
https://webpack.js.org/guides/getting-started/


# Dependencies
### webpack
`npm install webpack webpack-cli --save-dev`

### lodash
`npm install --save lodash`


## Run
To run the app use the following command
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

