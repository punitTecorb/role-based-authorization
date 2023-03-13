# Role based authorization

## Introduction
   Role based authorization using nodejs with TypeScript. we are using express-jwt and jsonwebtoken library for role based authorization.

   we'll go through a simple example of how to implement role based authorization / access control in a Node.js API with TypeScript.

   The example API has just three endpoints / routes to demonstrate authentication and role based authorization:

   1. /users/authenticate - public route that accepts HTTP POST requests with username and password in the body. If the username and password are correct then a JWT authentication token is returned.
   2. /users - secure route restricted to "Admin" users only, it accepts HTTP GET requests and returns a list of all users if the HTTP Authorization header contains a valid JWT token and the user is in the "Admin" role. If there is no auth token, the token is invalid or the user is not in the "Admin" role then a 401 Unauthorized response is returned.
   3. /users/:id - secure route restricted to authenticated users in any role, it accepts HTTP GET requests and returns the user record for the specified "id" parameter if authorization is successful. Note that "Admin" users can access all user records, while other roles (e.g. "User") can only access their own user record.

## Setup Steps:
### Required details for setup this project
   1. Add your mongodb database string in env file.
   2. Add your jwt token in env file.
   
### Install project dependency
`npm install`
### local server
`npm run start:dev`
### prod build
`npm run build`
### prod build run
`node dist/index.js`