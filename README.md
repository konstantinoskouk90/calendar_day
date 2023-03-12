# Calendar Day

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run On Server

### `npm install`

NOTE: Please ignore the `6 high severity vulnerabilities` after installing the node modules.
It is a `create-react-app` false alarm error: https://github.com/facebook/create-react-app/issues/11174
It is currently in the process of being fixed and relates to a dev dependency in react-scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run Statically

If the `build` folder exists, open the index.html file to launch the app.
However, if the build folder does not NOT exist in the root directory, run the below commands:

### `npm install`

NOTE: Please ignore the `6 high severity vulnerabilities` after installing the node modules.
It is a `create-react-app` false alarm error: https://github.com/facebook/create-react-app/issues/11174
It is currently in the process of being fixed and relates to a dev dependency in react-scripts.

We then build the project:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

and now open the index.html file in the `build` directory.

## Testing

To run the tests:

### `npm test`

Launches the test runner in the interactive watch mode.

NOTE: All the core bits of the business logic have been tested, however a rendered event in the UI has not.
In a future iteration of this we could add a library such as Cypress and write end-to-end tests to test the UI being rendered.

## Example Usage

Go to localhost:3000 or open the index.html file in the `build` directory and run the below in the console:

```
window.renderDay([{start: 10, end: 80}, {start: 200, end: 420}, {start: 290, end: 340}]);
```

## TODO

There's a lot we can add to this app:

- end-to-end tests
- calendar event title and decription
- modify the input to accept more human readable times
- make it work for week, month and year