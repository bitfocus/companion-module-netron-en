const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')

const UpgradeScripts = require('./src/upgrades')

const configFields = require('./src/configFields');
const api = require('./src/api');
const actions = require('./src/actions');
const variables = require('./src/variables');
const feedbacks = require('./src/feedbacks');
const presets = require('./src/presets');

class NetronENInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...api,
			...actions,
			...variables,
			...feedbacks,
			...presets,			
		})

		this.CURRENT_CUE_NAME = '';
		this.CURRENT_CUE = 0;

		this.INTERVAL = undefined;
	}

	async init(config) {
		this.configUpdated(config);
	}

	async configUpdated(config) {
		this.config = config

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.checkVariables();
		this.checkFeedbacks();

		this.startPolling();
	}

	async destroy() {
		this.stopPolling();
		this.debug('destroy', this.id);
	}
}

runEntrypoint(NetronENInstance, UpgradeScripts);