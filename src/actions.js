module.exports = {

	initActions() {
		let self = this; // required to have reference to outer `this`
		let actions = {};
		
		actions.runCue = {
			name: 'Run Cue',
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
				},
				{
					type: 'checkbox',
					label: 'Resend Ethernet',
					id: 'resendEthernet',
					default: true
				}

			],
			callback: async function(event) {
				let cmd = {
					CueResendEth: event.options.resendEthernet ? 1 : 0,
					RunCue: event.options.cueNumber,
					EndFlag: 1
				}
				self.sendRunCueCommand(cmd);
			}
		}

		actions.clearCue = {
			name: 'Clear Cue',
			options: [],
			callback: async function(event) {
				self.sendClearCueCommand();
			}
		};

		self.setActionDefinitions(actions);
	}
}