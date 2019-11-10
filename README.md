 
# Quick Start

  The quickest way to get started with Rent on cloud backend use [`github`](git://github.com/server.git) repository and clone as shown below:

## Requirements
 * Have Node v10.16.3 or higher installed for better use
 * Have MongoDB(4.2) installed and a local server running
 * Have TypeScript 1.5.0-beta or higher installed globally (npm i -g tsd typescript@^1.5.3-beta)
 * Code quality is maintained with the help of TSLint

```bash
$ git clone https://github.com/AlxPatidar/express-mongodb-ts.git server
$ cd server
```
Install dependencies and devDependencies:
```bash
$ yarn install / npm install
```

Start mongodb server:
```bash
$ sudo service mongod start
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ yarn install
$ yarn test
```
## Start Server
Configuration environment and change basic credentials:
```bash
$ cp .env.example .env
```
  Start server:
```bash
$ yarn start
```
  Start the development server:

```bash
$ yarn start:dev
```

  View the APIs at: http://localhost:4003

## Features

  * Express
  * Use Typescript
  * Super-high test coverage(use jest as testing tools)
  

## Docs & Community

  * [#express](https://webchat.freenode.net/?channels=express) on freenode IRC
  * [#typescript](https://www.typescriptlang.org/) for Official use and modules
  * [#mongodb](https://docs.mongodb.com/manual/reference/operator/aggregation/) for database management
