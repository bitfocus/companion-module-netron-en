module.exports = {
	initVariables() {
		let variables = [];

		if (this.config.polling) {
			variables.push( { variableId: 'current_cue', name: 'Current Cue Number' } );
		}

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		let self = this;

		try {
			let variableObj = {};

			if (self.config.polling) {
				variableObj['current_cue'] = self.CURRENT_CUE;
			}

			self.setVariableValues(variableObj);
		}
		catch(error) {
			//do something with that error
			if (self.config.verbose) {
				self.log('debug', 'Error Updating Variables: ' + error);
			}
		}
	}
}