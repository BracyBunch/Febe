# Good In This World

> A network for non-profits and software developers to come together and help solve technical issues/needs

## Team

  - __Product Owner__: Ryan Jones
  - __Scrum Master__: James Maveety
  - __Development Team Members__: Colin McKeehan, Yoshi Varney

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

### Dependencies

- "bcrypt": "^0.8.4",
- "bluebird": "^2.9.34",
- "body-parser": "^1.13.3",
- "debug": "^2.2.0",
- "express": "^4.13.3",
- "express-session": "^1.11.3",
- "joi": "^6.6.1",
- "lodash": "^3.10.1",
- "material-ui": "^0.10.4",
- "moment": "^2.10.6",
- "passport": "^0.3",
- "passport-facebook": "^2.0.0",
- "passport-github2": "^0.1.9",
- "passport-linkedin-oauth2": "^1.2.1",
- "passport-local": "^1.0.0",
- "react": "^0.13.3",
- "react-bootstrap": "^0.24.4",
- "react-onclickoutside": "^0.3.1",
- "react-router": "^1.0.0-beta2",
- "react-validation-mixin": "^4.2.0",
- "reflux": "^0.2.11",
- "request": "^2.60.0",
- "seraph": "^0.13.2",
- "seraph-model": "^0.7.2",
- "serve-favicon": "^2.3.0",
- "session-file-store": "~0.0.17",
- "tether": "^1.1.0",
- "validator": "^4.0.2",

### Dev Dependencies

- "browserify": "^11.0.1",
- "chai": "^3.2.0",
- "chai-http": "^1.0.0",
- "gulp": "^3.9.0",
- "gulp-react": "^3.0.1",
- "gulp-server-livereload": "^1.4.0",
- "gulp-uglify": "^1.2.0",
- "gulp-watch": "^4.3.4",
- "mocha": "^2.2.5",
- "node-notifier": "^4.2.3",
- "reactify": "^1.1.1",
- "sinon": "^1.15.4",
- "vinyl-buffer": "^1.0.0",
- "vinyl-source-stream": "^1.1.0",
- "watchify": "^3.3.1"

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

You must also have [Neo4J] (http://neo4j.com/download/) installed along with [Java 7] (http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html) for Neo4J

Follow the directions on the Neo4J download. Neo4J must be running.  

### Running in dev mode

From within the root directory:

```sh
npm start
```

http://localhost:3000 runs with the database
http://localhost:8000 is automatically loaded with npm start and live updates on changes to JSX files but does not connect to the database

### Roadmap

View the project roadmap [here](https://github.com/BracyBunch/Febe/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
