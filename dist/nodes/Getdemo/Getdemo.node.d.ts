import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ICredentialTestFunctions, INodeCredentialTestResult, ICredentialsDecrypted, ICredentialDataDecryptedObject } from 'n8n-workflow';
export declare class Getdemo implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
    methods: {
        credentialTest: {
            testGetdemoApiCredential(this: ICredentialTestFunctions, credential: ICredentialsDecrypted<ICredentialDataDecryptedObject>): Promise<INodeCredentialTestResult>;
        };
    };
}
