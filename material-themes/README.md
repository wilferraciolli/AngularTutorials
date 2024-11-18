# MaterialThemes

This project is a template on how to create custom theme within Material.
It will use custom theme such as light and dark and show how to dynamically change it.

Full tutorial can be found here `https://www.youtube.com/watch?v=M7q2Ty-y2zQ`
This site allows to generate color palettes `https://coolors.co/50514f-cdf7f6-ffc4eb-ff3366-de6e4b`
Then following this site allows to generate tones for a given color `https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors`
or this site to ge the color palettes `https://materialpalettes.com/`
And one to get a color pallete is `https://www.materialpalette.com/`

Some more details can be found here `https://levelup.gitconnected.com/defining-your-own-theme-in-angular-material-8a4a6ffad400`


## Dependencies
Material `ng add @angular/material`

## Instructions
Firstly import the


### To apply the background color t the whole page
Make sure to add the `mat-app-background` class to the app container and make it 100vh in order for the app to always 
take the whole screen and have the background color applied to the whole app an its children.
Eg app.component.html
```html
<div class="AppContainer mat-app-background">
  <roter-outlet />
</div>
```

```scss
.AppContainer {
  min-height: 100vh;
}
```
### overlay items Eg Modal
For the dialogs and overlay to also have themes applied, it is necessary to inject the OverlayContainer on the main component set the theme
