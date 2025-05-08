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
		{
			displayName: 'Portal Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			placeholder: 'mymssp',
		}
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "=Bearer {{$credentials.apiToken}}",
			}
		}
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: "=https://{{$credentials.subdomain}}.powerdmarc.com/api/v1",
			url: '/mssp/settings',
			method: 'GET',
		},
	}
}
