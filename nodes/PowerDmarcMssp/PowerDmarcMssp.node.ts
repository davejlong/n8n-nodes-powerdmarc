import { INodeType, INodeTypeDescription } from "n8n-workflow";

export class PowerDmarcMssp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PowerDMARC MSSP',
		name: 'powerdmarcmssp',
		icon: 'file:powerdmarc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Work with the PowerDMARC MSSP API',
		defaults: {
			name: 'PowerDMARC MSSP',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'powerDmarcApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.powerdmarc.com/api/v1',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Alert', value: 'alert' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'Domain Report', value: 'domainreport' },
					{ name: 'Hosted Service', value: 'hostedservice' },
					{ name: 'Power Toolbox', value: 'powertoolbox'},
					{ name: 'User', value: 'user' },
				],
				default: 'user'
			}
		]
	};
}
