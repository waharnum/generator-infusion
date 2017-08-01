
var Generator = require("yeoman-generator");
var validatePackageName = require("validate-npm-package-name");
var snakeCase = require("lodash").snakeCase;
var camelCase = require("lodash").camelCase;

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.option('projectName', {
            type: String,
            required: true,
            default: "new-project",
            desc: "Project name"
        });
    }

    writing() {
        var projectName = this.options.projectName;
        var snakecaseProjectName = snakeCase(this.options.projectName);
        var camelCaseProjectName = camelCase(this.options.projectName);
        this.log(snakecaseProjectName, camelCaseProjectName);
        // Copy project scaffold files
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath('.'),
            Object.assign({}, {projectName: projectName, snakecaseProjectName: snakecaseProjectName, camelCaseProjectName: camelCaseProjectName})
        );
        // Rename files based on project name
        this.fs.move(
            this.destinationPath('tests/js/project-tests.js'),
            this.destinationPath('tests/js/' + camelCaseProjectName + '-tests.js')
        );
        this.fs.move(
            this.destinationPath('tests/html/project-Tests.html'),
            this.destinationPath('tests/html/' + camelCaseProjectName + '-Tests.html')
        );
        this.fs.move(
            this.destinationPath('src/js/project-code.js'),
            this.destinationPath('src/js/' + camelCaseProjectName + '.js')
        );
    }

};
