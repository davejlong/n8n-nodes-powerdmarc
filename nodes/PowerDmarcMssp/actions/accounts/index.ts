import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		routing: {
			request: {
				url: '/accounts',
			},
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
				action: 'Get account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get accounts',
			},
		],
		default: 'getAll',
	},

	/**
	 * Get Many parameters
	 */
	{
		displayName: 'Date From',
		name: 'dateFrom',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					dateFrom: "={{new DateTime($value).format('yyyy-MM-dd')}}",
				},
			},
		},
		default: '',
	},
	{
		displayName: 'Date To',
		name: 'dateTo',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					dateTo: "={{new DateTime($value).format('yyyy-MM-dd')}}",
				},
			},
		},
		default: '',
	},
	{
		displayName: 'Date fields are used to retrieve volume of DMARC compliant emails',
		name: 'dateFields',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAll'],
			},
		},
	},

	/**
	 * Get Parameters
	 */
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				url: "=/accounts/{{$value}}",
			},
		},
	},
];

export { description }
