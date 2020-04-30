# Onfido SDK Sample App

## Overview

The purpose of this app is to show how to use the Onfido JavaScript SDK by use of the npm module. By use of script tags you can see the example in the [SDK repo here](https://github.com/onfido/onfido-sdk-ui).

## Run the app

Git clone the project and run `npm install` and then `npm run start`.

## Internals

The core app is the `src/index.js`.
The `getToken` function will send a request to an internal Onfido service called `sdk-token-factory` that generates JWTs that allows internal contributors to test the app.
In a real-life integration, the JWT would have to be requested from the host app server, which will then serve it to its front-end before initialising the SDK.
The application is started using `webpack-dev-server` and it uses `https`. The project is running at https://localhost:8090/.
