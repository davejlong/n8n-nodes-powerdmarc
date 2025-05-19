import { INodeProperties } from "n8n-workflow";

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
					send: {
						paginate: true,
					}
				}
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
			loadOptionsMethod: 'getAccounts',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['get', 'getAll'],
			},
		},
		routing: {
			request: {
				url: "=/accounts/{{$value}}/domains",
			},
		},
	},

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
				url: "=/accounts/{{$accountId}}/domains/{{$value}}",
			},
		},
	},
];

export { description }
