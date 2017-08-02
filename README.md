# generator-infusion

A [Yeoman](http://yeoman.io/) generator for Infusion-based projects.

## Basic Instructions

1. Install [Yeoman](http://yeoman.io/) - `npm install -g yo`
2. Install the generator (at the moment, since not published to NPM, `npm install -g https://github.com/waharnum/generator-infusion`)
3. Create a project directory
4. `yo infusion` in that directory to generate scaffolding for a new project

## Current Functionality

* Main `app` generator: `yo infusion`
  * Creates a basic `package.json` based on user input
  * Installs dev dependencies necessary to run the standard linter with `grunt lint`
  * Supplies an example pre-commit hook for running the linter with Git commits
  * Offers to run the `clientGrade` subgenerator
* `clientGrade` subgenerator: `yo infusion:clientGrade`
  * Generates boilerplate file and corresponding test files for a new Infusion grade, based on user input
  * Runs the `all-tests` subgenerator to update the client-side all tests runner file
* `all-tests`: generates a fresh client-side complete test runner file in `tests/all-tests.html`, based on the presence of test files in `tests/html/`
