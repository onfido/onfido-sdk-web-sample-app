# Onfido SDK Sample App

## Overview

The purpose of this app is to show how to use the Onfido JavaScript SDK by use of the npm module.
By use of script tags you can see the example in the
[SDK repo here](https://github.com/onfido/onfido-sdk-ui).

## Run the app

Firstly, clone the project and run `npm install`.

### The vanilla way

- Serve it at port `8090`: `npm run start:vanilla`
- Access it via HTTPS: `https://localhost:8090`
- The app is located in `src/vanilla/index.js`

## Internals

- The `getToken` function will send a request to an internal Onfido service
  called `sdk-token-factory` that generates JWTs that allows internal contributors to test the app.
- In a real-life integration, the JWT would have to be requested from the host app server,
  which will then serve it to its front-end before initialising the SDK.
- The application runs on `https` using `webpack-dev-server`.
