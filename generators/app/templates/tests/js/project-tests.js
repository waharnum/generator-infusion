/* global fluid */

(function ($, fluid) {

    "use strict";

    // Basic non-IoC synchronous test
    jqUnit.test("Test message content", function() {
        var projectComponent = projectTemplate.projectComponent();
        jqUnit.expect(1);
        jqUnit.assertEquals("Test message has expected content", "Hello, world", projectComponent.model.message);
    });

    // Basic non-IoC asyc test
    jqUnit.asyncTest("Test message content", function () {
        jqUnit.expect(1);

        var projectComponent = projectTemplate.projectComponent({
            listeners: {
                "onAnnounceComplete.testMessageContent": {
                    "this": "jqUnit",
                    "method": "assertEquals",
                    "args": ["Test message has expected content", "Hello, world", "{that}.model.message"]
                },
                "onAnnounceComplete.testDone": {
                    "this": "jqUnit",
                    "method": "start",
                    "priority": "after:testMessageContent"
                }
            }
        });
    });

    // Basic IoC test structure

    fluid.defaults("projectTemplate.projectComponentTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test the project component.",
            tests: [{
                name: "Test message content and changes.",
                sequence: [{
                    listener: "projectTemplate.projectComponentTester.testMessageContent",
                    "event": "{projectComponentTest projectComponent}.events.onCreate",
                    args: ["{projectComponent}", "Hello, world"]
                }]
            }]
        }]
    });

    fluid.defaults("floe.tests.projectComponentTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            projectComponent: {
                type: "projectTemplate.projectComponent",
                createOnEvent: "{projectComponentTester}.events.onTestCaseStart"
            },
            projectComponentTester: {
                type: "projectTemplate.projectComponentTester"
            }
        }
    });

    projectTemplate.projectComponentTester.testMessageContent = function (component, expectedMessage) {
        jqUnit.assertEquals("Test message has expected content", expectedMessage, component.model.message);
    };

    floe.tests.projectComponentTest();

})(jQuery, fluid);
