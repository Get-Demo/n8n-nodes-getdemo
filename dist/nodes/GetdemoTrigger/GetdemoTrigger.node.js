"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdemoTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class GetdemoTrigger {
    constructor() {
        this.description = {
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
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookData = this.getWorkflowStaticData('node');
                    return !!webhookData.webhookId;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    webhookData.webhookUrl = webhookUrl;
                    webhookData.webhookId = 'default';
                    return true;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    delete webhookData.webhookUrl;
                    delete webhookData.webhookId;
                    return true;
                },
            },
        };
    }
    async webhook() {
        const req = this.getRequestObject();
        const body = req.body;
        return {
            workflowData: [
                [
                    {
                        json: body,
                    },
                ],
            ],
        };
    }
}
exports.GetdemoTrigger = GetdemoTrigger;
//# sourceMappingURL=GetdemoTrigger.node.js.map