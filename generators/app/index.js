
var Generator = require("yeoman-generator");
var validatePackageName = require("validate-npm-package-name");
var snakeCase = require("lodash").snakeCase;
var camelCase = require("lodash").camelCase;

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

    // Next, add your custom code
        this.promptAnswers = {};
    }

    prompting() {
        return this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Project name (for NPM)",
                default: "new-project",
                validate: function (input) {
                    if(validatePackageName(input).validForNewPackages) {
                        return true;
                    } else {
                        return "Must be a valid NPM package name - refer to https://www.npmjs.com/package/validate-npm-package-name for rules";
                    }

                }
            },
            {
                type: "input",
                name: "projectVersion",
                message: "Project version",
                default: "0.1.0"
            },
            {
                type: "input",
                name: "projectDescription",
                message: "Project description",
                default: "New Infusion client-side project"
            },
            {
                type: "input",
                name: "projectAuthor",
                message: "Project author",
                default: "Fluid Project"
            },
            {
                type: "confirm",
                name: "generateClientSideGrade",
                message: "Generate an initial client-side grade?",
                default: false
            }
        ]).then((answers) => {
            Object.assign(this.promptAnswers, answers);
        });
    }

    writing() {

        var projectName = this.promptAnswers.projectName;
        var snakecaseProjectName = snakeCase(this.options.projectName);
        var camelCaseProjectName = camelCase(this.options.projectName);
        this.log(snakecaseProjectName, camelCaseProjectName);
        // Copy project scaffold files
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath('.'),
            Object.assign(this.promptAnswers, {snakecaseProjectName: snakecaseProjectName, camelCaseProjectName: camelCaseProjectName})
        );

        // Copy dotfiles
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath('.')
        );

        if(this.promptAnswers.generateClientSideGrade) {
            this.composeWith(require.resolve('../clientGrade'), {
                projectName: this.promptAnswers.projectName
            });
        }
    }

    install() {
        this.npmInstall();
    }
};
