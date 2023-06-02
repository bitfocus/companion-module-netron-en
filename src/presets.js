const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets() {
		let self = this;
		
		const presets = [];

		for (let i = 1; i <= 99; i++) {
			presets.push(
			{
				type: 'button',
				category: 'Cues',
				label: 'Run Cue ' + i,
				style: {
					text: 'Run Cue ' + i,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'runCue',
								options: {
									cueNumber: i,
									resendEthernet: true
								}
							}
						],
						up: []
					}
				],
				feedbacks: [
					{
						feedbackId: 'currentCue',
						options: {
							cueNumber: i
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					}
				]
			})
		}

		this.setPresetDefinitions(presets)
	},
}