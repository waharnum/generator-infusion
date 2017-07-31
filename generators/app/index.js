var Generator = require("yeoman-generator");
var validatePackageName = require("validate-npm-package-name");

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

    // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
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
            }
        ]).then((answers) => {
            Object.assign(this.promptAnswers, answers);
        });
    }

    writing() {
        // Copy project scaffold files
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath('.'),
            this.promptAnswers
        );
        // Copy dotfiles
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath('.')
        );
    }

    installingDependencies() {
        this.npmInstall();
    }

};
