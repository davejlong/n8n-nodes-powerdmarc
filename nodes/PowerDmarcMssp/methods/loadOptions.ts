import { IHttpRequestOptions, ILoadOptionsFunctions, INodePropertyOptions, NodeOperationError } from "n8n-workflow";

export async function getAccountOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('powerDmarcApi');

	const requestOptions: IHttpRequestOptions = {
		method: 'GET',
		baseURL: `https://${credentials.subdomain}.powerdmarc.com/api/v1/mssp`,
		url: '/accounts',
		qs: {
			dateFrom: (new Date()).toISOString(),
			dateTo: (new Date()).toISOString(),
		},
	};

	const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'powerDmarcApi', requestOptions);

	if (responseData == undefined) {
		throw new NodeOperationError(this.getNode(), `No data returned from ${requestOptions.url}`);
	}

	const accountOptions: INodePropertyOptions[] = [];
	for (const data of responseData.data) {
		this.logger.debug(`POWERDMARC: Add ${JSON.stringify(data)} to list`);
		accountOptions.push({
			name: data.name,
			value: data.id,
		});
	}
	return accountOptions;
}
