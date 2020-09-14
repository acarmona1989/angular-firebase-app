// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyD_WL00HAu2y4DgfXG40cpH9L8lq3xqqoQ",
    authDomain: "my-bitacora.firebaseapp.com",
    databaseURL: "https://my-bitacora.firebaseio.com",
    projectId: "my-bitacora",
    storageBucket: "my-bitacora.appspot.com",
    messagingSenderId: "38551044995",
    appId: "1:38551044995:web:5dedf62bd394ff9e6eecb6"
  },
 apiUrl:"http://localhost:5000/my-bitacora/us-central1/webApi/api/v1"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
