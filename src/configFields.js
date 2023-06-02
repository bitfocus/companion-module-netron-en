module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will control the Netron EN series.'
			},
			{
				type: 'textinput',
				id: 'host',
				width: 6,
				label: 'Host/IP Address',
				default: '192.168.0.1'
			},
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Polling',
				value: 'Enabling polling will allow for feedbacks & variables.'
			},
			{
				type: 'checkbox',
				label: 'Polling',
				id: 'polling',
				width: 1,
				default: true
			},
			{
				type: 'number',
				label: 'Polling Rate (ms)',
				id: 'pollingRate',
				width: 2,
				min: 100,
				max: 5000,
				default: 500,
				required: true
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			}
		]
	},
}
