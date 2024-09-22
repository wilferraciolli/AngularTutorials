# Ionic build app for Angular 17
The tutorial can be found here
`https://www.youtube.com/watch?v=tbrJJkSYQ04`

The whole app is just taking a list of movies and displauing it


# Commands

install ionic
`npm install -g @ionic/cli`


To run the server simply type
`ionic serve`


### Capacitor
PS make sure to build the app production first 
`ng build --configuration production
`
Install
`npm i @capacitor/core`
`npm i -D @capacitor/cli`

Instantiate capacitor project/config
`npx cap init`

Add mobile apps
`npm i @capacitor/android @capacitor/ios`

`npx cap add android`
`npx cap add ios`


Finally, sync the angular code to mobile projects
`npx cap sync`


To open the ide with the project run the following commnads
`npx cap open ios`
`npx cap open android`
