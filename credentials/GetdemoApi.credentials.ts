import type { ICredentialType, INodeProperties } from 'n8n-workflow';

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

	authenticate = {
		type: 'generic' as const,
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
