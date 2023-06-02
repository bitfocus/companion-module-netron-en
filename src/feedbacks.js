const { combineRgb } = require('@companion-module/base')

module.exports = {
    // ##########################
    // #### Define Feedbacks ####
    // ##########################
    initFeedbacks() {
        let self = this;
        const feedbacks = {};

        const foregroundColorWhite = combineRgb(255, 255, 255) // White
        const foregroundColorBlack = combineRgb(0, 0, 0) // Black
        const backgroundColorRed = combineRgb(255, 0, 0) // Red
        const backgroundColorGreen = combineRgb(0, 255, 0) // Green
        const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

        feedbacks.currentCue = {
            type: 'boolean',
            name: 'Change colors if X is the current cue',
            description: 'Sets the background according to the current cue',
            defaultStyle: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
            options: [
                {
					type: 'number',
					label: 'Cue Number',
					id: 'cueNumber',
					min: 1,
					max: 99,
					default: 1,
					required: true,
					range: false
				}
            ],
            callback: function (feedback) {
                let opt = feedback.options;

				if (this.CURRENT_CUE == opt.cueNumber) {
					return true;
				}

                return false;
            }
        }

        self.setFeedbackDefinitions(feedbacks);
    }
}