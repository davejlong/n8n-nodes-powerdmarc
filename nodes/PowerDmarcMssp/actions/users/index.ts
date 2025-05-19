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
				resource: ['user'],
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
				routing: {
					request: {
						url: "=/members",
					},
					send: {
						paginate: true,
					},
				},
			},
		],
		default: 'getAll',
	},
	getAccountProperty('user', ['get', 'getAll']),

	/**
	 * Get Parameters
	 */
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				url: "=/members/{{$value}}",
			},
		},
	},
];

export { description }
