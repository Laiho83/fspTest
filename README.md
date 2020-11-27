# FspTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Production
This is the link to working version: [https://laiho83.github.io/fspTest/](https://laiho83.github.io/fspTest/)

## Steps to run the app

1. Clone the repository: `git clone https://github.com/Laiho83/fspTest.git`
2. In the root folder run: `yarn install`
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## App overview
**Configuration file**
- AppConfig hold the information about the colour app for fetching random colours.

**Routing**
- Routing is handled from `app-routing.module.ts`. There is only one route set up for the main page.
- **Resolver** is used to resolve the colr.api endpoint. Resolver was used instead of "CanActivate" route guard as we need to fetch the initial data before the route starts navigation. In case of a bad response, error is thrown and empty Observable forward to the component.

**Components**
- Only one component `ball.component.ts` that holds the ball wrapper
- All the logic that handles interaction between COM and services
- Fetching the data from Resolver. In case of a successful API response the initial state of the ball is set together with the wrapper.

**Services**
- **ApiService** handles API Http requests
- **ColrInterceptor** For intercepting the request as we have to change request header, due to browser response caching
- **StateService** Handles the app state via BehaviorSubject 
- **StoreService** Handles array of data of all the states, as well as methods for calculating the position of the ball. After we have all the data, there is no need for further request to the colour API as everything is stored in the `store` variable.
- **UiControlService** Handles the data we need for DOM manipulation.

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
