module.exports = {
	initVariables() {
		let variables = [];

		if (this.config.polling) {
			variables.push( { variableId: 'current_cue_name', name: 'Current Cue Number' } );
		}

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		try {
			let variableObj = {};

			if (this.config.polling) {
				variableObj['current_cue'] = this.CURRENT_CUE;
			}

			this.setVariableValues(variableObj);
		}
		catch(error) {
			//do something with that error
			if (this.config.verbose) {
				this.log('debug', 'Error Updating Variables: ' + error);
			}
		}
	}
}