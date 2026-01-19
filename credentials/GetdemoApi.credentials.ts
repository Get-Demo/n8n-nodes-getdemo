import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GetdemoApi implements ICredentialType {
	name = 'getdemoApi';

	displayName = 'Getdemo API';

	icon = 'file:logo.png' as const;

	documentationUrl = 'https://app.getdemo.com.br/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Getdemo API Key. Generate it in Getdemo → Integrations → API',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://get-demo-backend-prod.getdemo.com.br/api/external/v1',
			url: '/recording',
			method: 'GET',
		},
	};
}
