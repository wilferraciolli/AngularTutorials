# AngularIonicCapacitor

This project is an Angular app made onto a mobile app using Ionic Capacitor
The tutorials can be found here https://www.youtube.com/watch?v=V2Wn2JROUEo&t=1361s


Capacitor original website is here `https://capacitorjs.com/`
### Pre requisits
Install Android Studio

### Dependencies
Material
`ng add @angular/material`

Capacitor
`npm install @capacitor/core`
`npm install @capacitor/cli --save-dev`


### Instructions
Run `npx cap init` to initialize the mobile app
Follow the instructions by filling in details
The command above will create the capacitor.config file within the project, check its values and make sure that the webDir folder is set correctly
Eg 
```
  const config: CapacitorConfig = {
  appId: 'com.wiltech.capacitor',
  appName: 'angular-ionic-capacitor',
  webDir: 'dist/angular-ionic-capacitor/browser',
};
```


Next build the app as prod to get the DISt files created 
`ng build --configuration production`

The next step is to add he mobile platforms (apple and android)
run 
`npm install @capacitor/ios @capacitor/android`

Then add each platform individually
`npx cap add ios`
`npx cap add android`

NEXT
run the command to open the editor
`npx cap open ios`
`npx cap open android`



Now we can install plugins
PS after any plugin is installed we need to sync the app by running `npx cap sync`

### Capacitor plugins
Camera
`npm install @capacitor/camera`
