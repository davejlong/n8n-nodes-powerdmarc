import { DeclarativeRestApiSettings, IDataObject, IExecuteFunctions, IExecutePaginationFunctions, IExecuteSingleFunctions, IHookFunctions, IHttpRequestMethods, IHttpRequestOptions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, IPollFunctions, IWebhookFunctions } from "n8n-workflow";

export async function powerDmarcApiRequest(
	this:
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| IWebhookFunctions
		| IPollFunctions
		| IHookFunctions
		| ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	url?: string,
	option: IDataObject = {},
) {
	const credentials = await this.getCredentials('powerDmarcApi');
	let options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		url: url ?? `https://${credentials.subdomain}.powerdmarc.com/api/v1${resource}`,
		json: true,
	};
	if (!Object.keys(body).length) { delete options.body; }
	if (!Object.keys(qs).length) { delete options.qs; }

	this.logger.debug(`POWERDMARC: API Request`, options);

	options = Object.assign({}, options, option);
	return await this.helpers.httpRequestWithAuthentication.call(this, 'powerDmarcApi', options);
}

export async function powerDmarcApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const responseData: INodeExecutionData[] = [];
	const rootProperty = 'data';

	requestData.options.qs = requestData.options.qs ?? {};

	let responseTotal = 0;

	do {
		const pageResponseData: INodeExecutionData[] = await this.makeRoutingRequest(requestData);
		this.logger.debug(`POWERDMARC: Paginated request`, pageResponseData);
		const items = pageResponseData[0].json[rootProperty] as [];
		items.forEach((item) => responseData.push({ json: item }));

		const meta = pageResponseData[0].json.meta as IDataObject;
		const nextPage = (meta.current_page as number) + 1;
		requestData.options.qs.page = nextPage;

		responseTotal = (meta.total as number) || 0;
	} while (responseTotal > responseData.length);

	return responseData;
}

export async function getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData: INodePropertyOptions[] = [];
	const qs = {
		dateFrom: (new Date().toISOString()),
		dateTo: (new Date().toISOString()),
		page: 1,
	}
	let responseTotal = 0;
	do {
		const pageResponseData = await powerDmarcApiRequest.call(this, 'GET', '/mssp/accounts', {}, qs);
		const items = pageResponseData.data as [{name: string, id: number}];
		items.forEach(item => responseData.push({
			name: item.name,
			value: item.id
		}));

		qs.page++;

		const meta = pageResponseData.meta as IDataObject;
		responseTotal = (meta.total as number) || 0;
	} while (responseTotal > responseData.length)

	return responseData;
}
