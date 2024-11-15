# WilTech libraries (This is now within its own repository)


To create libraries follow this tutorial
`https://angular.dev/tools/libraries/creating-libraries`

For more details you see this tutorial here `https://www.syncfusion.com/blogs/post/share-angular-components-across-projects?ref=dailydev`


* Create a workspace `ng new wiltech-libraries --no-create-application`
* Create a library `ng generate library user-store`

The command above will create a workspace called `eiltech-libraries` followed by a library called `user-store` inside the projects folder

To create components within the each library, then navigate to the root of the library Eg `cd projects` and `cd user-store` 

# Adding dependencies
Make sure that dependencies are added as peerDependencies to make sure it is added to the library and avoid issues as only peerDependencies are bundled together and dependencies is just for dev

# building
run `ng build`

