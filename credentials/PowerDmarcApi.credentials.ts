import { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class PowerDmarcApi implements ICredentialType {
	name = 'powerDmarcApi';
	displayName = 'PowerDMARC API';
	documentationUrl = 'https://github.com/davejlong/n8n-nodes-powerdmarc';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true, },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "={{$credentials.apiToken}}",
			}
		}

	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.powerdmarc.com/api/v1',
			url: '/mssp/resources',
			method: 'GET',
			qs: {
				userType: 2,
			}
		},
	}
}
