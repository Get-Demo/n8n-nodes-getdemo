import type {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHookFunctions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class GetdemoTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Getdemo Trigger',
		name: 'getdemoTrigger',
		icon: 'file:getdemo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when a Getdemo view event occurs (view started, step changed, or disconnected)',
		defaults: {
			name: 'Getdemo Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{$parameter["path"]}}',
				isFullPath: false,
			},
		],
		properties: [
			{
				displayName: 'Webhook Path',
				name: 'path',
				type: 'string',
				default: 'getdemo-view',
				required: true,
				description: 'The path to listen for webhook events from Getdemo',
				placeholder: 'getdemo-view',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// For simple webhooks, n8n handles registration internally
				// We just need to indicate that the webhook exists when workflow is active
				const webhookData = this.getWorkflowStaticData('node');
				return !!webhookData.webhookId;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Get the webhook URL that n8n will listen on
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				
				// Store the URL and ID to indicate webhook is created
				webhookData.webhookUrl = webhookUrl;
				webhookData.webhookId = 'default';
				
				// n8n will automatically register the webhook internally
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Clean up static data when workflow is deactivated
				const webhookData = this.getWorkflowStaticData('node');
				delete webhookData.webhookUrl;
				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body;

		// Return the webhook payload as the output data
		return {
			workflowData: [
				[
					{
						json: body as IDataObject,
					},
				],
			],
		};
	}
}
