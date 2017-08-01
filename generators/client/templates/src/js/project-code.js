/* global fluid */

(function ($, fluid) {

    "use strict";

    fluid.defaults("projectTemplate.projectComponent", {
        gradeNames: ["fluid.modelComponent"],
        model: {
            "message": "Hello, world"
        },
        events: {
            onAnnounceComplete: null
        },
        listeners: {
            "onCreate.announce": {
                "this": "console",
                "method": "log",
                "args": ["{that}.model.message"]
            },
            "onCreate.announceComplete": {
                "func": "{that}.events.onAnnounceComplete.fire",
                "priority": "after:announce"
            }
        }
    });

})(jQuery, fluid);
