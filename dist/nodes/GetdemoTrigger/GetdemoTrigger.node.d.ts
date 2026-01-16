import type { IWebhookFunctions, IWebhookResponseData, INodeType, INodeTypeDescription, IHookFunctions } from 'n8n-workflow';
export declare class GetdemoTrigger implements INodeType {
    description: INodeTypeDescription;
    webhookMethods: {
        default: {
            checkExists(this: IHookFunctions): Promise<boolean>;
            create(this: IHookFunctions): Promise<boolean>;
            delete(this: IHookFunctions): Promise<boolean>;
        };
    };
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
