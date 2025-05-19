import { INodeProperties } from "n8n-workflow";
import { getAccountProperty } from "../../GenericFunctions";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domain'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get domain',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get domains',
				routing: {
					request: {
						url: "=/domains"
					},
					send: {
						paginate: true,
					},
				},
			},
		],
		default: 'getAll',
	},
	getAccountProperty('domain', ['get', 'getAll']),

	/**
	 * Get Parameters
	 */
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				url: "=/domains/{{$value}}",
			},
		},
	},
];

export { description }
