import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		routing: {
			output: {
				postReceive: [
					{
						type: 'rootProperty',
						properties: { property: 'data' },
					},
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get user',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get users',
			},
		],
		default: 'getAll',
	},
	/**
	 * Get Many Parameters
	 */
	{
		displayName: 'Account Name or ID',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		name: 'accountId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAccountOptions',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'getAll'],
			},
		},
		routing: {
			request: {
				url: "=/accounts/{{$value}}/members",
			},
		},
	},
];

export { description }
