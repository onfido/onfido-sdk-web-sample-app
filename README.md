# Onfido SDK Sample App

## Overview

The purpose of this app is to show how to use the Onfido JavaScript SDK by use of the npm module. By use of script tags you can see the example in the [SDK repo here](https://github.com/onfido/onfido-sdk-ui).

## Run the app

Create a file `./secrets.json` and add an `apiToken` to it as a JSON property.

Example:

```json
{
  "apiToken":"something_1321321321j3123kkljkkl"
}

```

Git clone the project and run `npm install` and then `npm run dev`.

## Internals

The core app is the `node app/server.js`.
This server will be serving JWTs to the front-end and will also initialize the Webpack server, which in turn provides the front-end code and assets.
This node server will also create https credentials which will be shared with the Webpack server as well.
This credential sharing is particularly important considering that both the JWT endpoint, provided by the node server, and the front-end code, provided by the Webpack server, are different servers on different ports, and since the client will be hitting both (asking for JWTs and for assets), the user would have to accept two sets of credentials in case they had not been shared.
