/* global fluid, jqUnit, projectTemplate */

(function ($, fluid) {

    "use strict";

    // Basic non-IoC synchronous test
    jqUnit.test("Test message content", function () {
        var projectComponent = <%= gradeName %>();
        jqUnit.expect(1);
        jqUnit.assertEquals("Test message has expected content", "Hello, world", projectComponent.model.message);
    });

    // Basic non-IoC asyc test
    jqUnit.asyncTest("Test message content", function () {
        jqUnit.expect(1);

        <%= gradeName %>({
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

    fluid.defaults("<%= gradeName %>Tester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test the <%= gradeName %> component.",
            tests: [{
                name: "Test message content and changes.",
                sequence: [{
                    listener: "<%= gradeName %>Tester.testMessageContent",
                    "event": "{projectComponentTest projectComponent}.events.onCreate",
                    args: ["{projectComponent}", "Hello, world"]
                }]
            }]
        }]
    });

    fluid.defaults("projectTemplate.tests.projectComponentTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            projectComponent: {
                type: "<%= gradeName %>",
                createOnEvent: "{projectComponentTester}.events.onTestCaseStart"
            },
            projectComponentTester: {
                type: "<%= gradeName %>Tester"
            }
        }
    });

    <%= gradeName %>Tester.testMessageContent = function (component, expectedMessage) {
        jqUnit.assertEquals("Test message has expected content", expectedMessage, component.model.message);
    };

    projectTemplate.tests.projectComponentTest();

})(jQuery, fluid);
