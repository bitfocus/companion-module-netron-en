const { InstanceStatus } = require('@companion-module/base')

const Client  = require('node-rest-client').Client;

module.exports = {
	startPolling() {
		if (this.config.polling) {
			this.INTERVAL = setInterval(this.getCurrentCue.bind(this), this.config.pollingRate);
			this.updateStatus(InstanceStatus.Connecting);
		}
		else {
			this.status(InstanceStatus.Ok); //mark it ok because we really don't know if it's ok or not until an action is sent
		}
	},

	stopPolling() {
		if (this.INTERVAL !== undefined) {
			clearInterval(this.INTERVAL);
			delete this.INTERVAL;
		}
	},

	getCurrentCue() {
		let args = {};	
		let client = new Client();
	
		client.get('http://' + this.config.host + '/CueStatus.json', args, function (data, response) {
			if (typeof data !== 'object') {
				data = JSON.parse(data);
			}

			if (data && data.CueRunningName) {
				this.CURRENT_CUE_NAME = data.CueRunningName;
				if (data.CueRunningName.indexOf('Cue ') > -1) {
					this.CURRENT_CUE = parseInt(data.CueRunningName.replace('Cue ',''));
				}
				this.checkVariables();
				this.checkFeedbacks();
				this.status(InstanceStatus.Ok);
			}
		}.bind(this)).on('error', function(error) {
			this.status(InstanceStatus.Error);
			this.log('error', 'Error Getting Current Cue: ' + error.toString());
			if  (this.INTERVAL !== undefined) {
				this.log('debug', 'Stopping Polling...');
				this.stopPolling();
			}
		}.bind(this));
	},

	sendRunCueCommand(cmd) {
		this.log('info', 'Running Cue ' + cmd.RunCue);
		
		let args = {
			data: cmd
		};
	
		let client = new Client();
	
		client.post('http://' + this.config.host + '/run_cues', args, function (data, response) {
			//do something with response
		}.bind(this)).on('error', function(error) {
			this.log('error', 'Error Sending Run Cue Command ' + error.toString());
		}.bind(this));
	},
	
	sendClearCueCommand() {
		let cmd = {
			CueResendEth: 1,
			RunCue: 0,
			EndFlag: 1
		};

		let args = {
			data: cmd
		};
	
		let client = new Client();
	
		client.post('http://' + this.config.host + '/run_cues', args, function (data, response) {
			//do something with response
		}.bind(this)).on('error', function(error) {
			this.log('error', 'Error Sending Clear Cue Command ' + error.toString());
		}.bind(this));
	}
}