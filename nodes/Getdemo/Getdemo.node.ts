import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Getdemo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Getdemo',
		name: 'getdemo',
		icon: 'file:getdemo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Getdemo API to list recordings and manage demos',
		defaults: {
			name: 'Getdemo',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'getdemoApi',
				required: true,
				testedBy: 'testGetdemoApiCredential',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Recording',
						value: 'recording',
					},
				],
				default: 'recording',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['recording'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all recordings (demos)',
						action: 'List all recordings',
					},
				],
				default: 'list',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const baseUrl = 'https://get-demo-backend-prod.getdemo.com.br/api/external/v1';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'recording' && operation === 'list') {
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseUrl}/recording`,
						headers: {
							Accept: 'application/json',
						},
					};

					const responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'getdemoApi',
						options,
					);

					if (Array.isArray(responseData)) {
						for (const item of responseData) {
							returnData.push({
								json: item,
								pairedItem: { item: i },
							});
						}
					} else {
						returnData.push({
							json: responseData,
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
