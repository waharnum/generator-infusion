var Generator = require("yeoman-generator");

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

        this.promptAnswers = {};
    }

    prompting() {
        return this.prompt([
            {
                type: "input",
                name: "gradeName",
                message: "Full grade name",
                default: "infusionGenerator.newGrade"
            },
            {
                type: "input",
                name: "gradeFilename",
                message: "Grade file name",
                default: "newGrade"
            },
        ]).then((answers) => {
            Object.assign(this.promptAnswers, answers);
        });
    }

    writing() {
        var packageFile = this.fs.readJSON(this.destinationPath('package.json'));

        var projectName = packageFile.name || this.options.projectName,
            gradeName = this.promptAnswers.gradeName,
            gradeFilename = this.promptAnswers.gradeFilename;

        // Copy grade scaffold files
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath('.'),
            Object.assign(this.promptAnswers, {projectName: projectName})
        );
        // Rename the grade files based on user supplied information
        this.fs.move(
            this.destinationPath('tests/js/gradeFilenameTests.js'),
            this.destinationPath('tests/js/' + gradeFilename + 'Tests.js')
        );
        this.fs.move(
            this.destinationPath('tests/html/gradeFilename-Tests.html'),
            this.destinationPath('tests/html/' + gradeFilename + '-Tests.html')
        );
        this.fs.move(
            this.destinationPath('src/js/gradeFilename.js'),
            this.destinationPath('src/js/' + gradeFilename + '.js')
        );
        this.composeWith(require.resolve('../all-tests'), {
            projectName: projectName
        });
    }

};
