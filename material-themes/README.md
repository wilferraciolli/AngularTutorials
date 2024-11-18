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
Firstly create a new scss file next the styles.scss called themes.scss
them within angular.json, on the styles section define in both places Eg
```json
{
  "styles": [
    "@angular/material/prebuilt-themes/indigo-pink.css",
    "src/styles.scss",
    "src/themes.scss"
  ]
}
```
within the theme file, import material variables Eg
```scss
@use '@angular/material' as mat;

// add material core
@include mat.core();

// define the palettes, themes and set the default theme
```

Conditionally check that within the body tag, if the dark-theme is applied, then add the dark theme palette
```scss
@include mat.all-component-themes($light-theme);

body.dark-theme {
  @include mat.all-component-themes($dark-theme);
}
```

Finally create a toggle to add or remove the dark-thme class to the body element causing the palettes to be switched
app.component.ts
```ts
  public toggleTheme(): void {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }
```

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
For the dialogs and overlay to also have themes applied, it is necessary to inject the OverlayContainer on 
the main component and set the theme based ont the classes applied to the body 
