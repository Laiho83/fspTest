# FspTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.


## Steps to run the app

1. Clone the repository: `git clone https://github.com/Laiho83/fspTest.git`
2. In the root folder run: `yarn install`
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Folder structure
**Configuration file**
- AppConfig hold the information about the colour app for fetching random colours.

**Routing**
- Routing is handled from `app-routing.module.ts`. There is only one route set up for the main page.
- **Resolver** is used to resolve the colr.api endpoint. Resolver was used instead of "CanActivate" router guard as we need to fetch the initial data before the component before the route starts navigation. In case of a bad response, error is thrown and empty Observable forward to component.

**Components**
- Only one component `ball.component.ts` that holds the ball wrapper
- Fetching the data from Resolver, in case of a successful API response the initial state of the ball is set together with the wrapper.
- All the logic that handles interection between COM and services

**Services**
- **ApiService** handles API Http requests
- **ColrInterceptor** For intercepting the request as we have to change request header, due to browser response caching
- **StateService** Handles the app state via BehaviorSubject 
- **StoreService** Handles array of data of all the states as well as methods for calculating the position of the ball. After we have all the data, there is no need for further request to the colour API as everything is stored in the `store` variable.

**Styling**
- Scss is used with the following structure:
  Main scss file is `style.scss` with all the imports.
  
  ```bash
  ├── helpers
  │   ├── _mixins.scss
  ├── base
  │   ├── _general.scss
  │   ├── _grid.scss
  ├── variables
  │   ├── _breakpoints.scss
  │   ├── _variables.scss
  └── _theme.scss
  ```
