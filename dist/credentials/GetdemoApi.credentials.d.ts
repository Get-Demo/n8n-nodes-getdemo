import type { ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class GetdemoApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: "file:logo.png";
    documentationUrl: string;
    properties: INodeProperties[];
    authenticate: {
        type: "generic";
        properties: {
            headers: {
                'x-api-key': string;
            };
        };
    };
}
