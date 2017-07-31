# generator-infusion

A [Yeoman](http://yeoman.io/) generator for Infusion-based projects.

## Instructions

1. Install [Yeoman](http://yeoman.io/) - `npm install -g yo`
2. Install the generator (at the moment, since not published to NPM, `npm install -g https://github.com/waharnum/generator-infusion`)
3. Create a project directory
4. `yo infusion` in that directory to generate scaffolding

## Current Functionality

Right now, this generates a basic scaffolding for front-end projects. It creates initial files in `src` and `tests` based on the supplied project name, and HTML files with Infusion linked from `node_modules`.

It also configures the official linter setup (https://www.npmjs.com/package/eslint-config-fluid) and includes a sample `pre-commit` hook file that can be used to run the linter before all commits.
