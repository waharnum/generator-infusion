var Generator = require("yeoman-generator");
var fs = require('fs');

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
        this.log("generating all-tests.html file using the files in tests/html");
        var testHTMLDir = this.destinationPath('tests/html/');
        var testHTMLFiles = [];
        fs.readdir(testHTMLDir, (err, files) => {
            if(files) {
                this.log(files.length + " files found");
                files.forEach(file => {
                    testHTMLFiles.push(file);
                });
            this.log(testHTMLFiles);
            this.fs.copyTpl(
                this.templatePath('**'),
                this.destinationPath('.'),
                {projectName: this.options.projectName, testHTMLFiles: testHTMLFiles}
            );
            } else {
                this.log("no files found in tests/html/");
            }
        });

    }

};
