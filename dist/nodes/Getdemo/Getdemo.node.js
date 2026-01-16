"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getdemo = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Getdemo {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
        this.methods = {
            credentialTest: {
                async testGetdemoApiCredential(credential) {
                    var _a;
                    const baseUrl = 'https://get-demo-backend-prod.getdemo.com.br/api/external/v1';
                    if (!((_a = credential.data) === null || _a === void 0 ? void 0 : _a.apiKey)) {
                        return {
                            status: 'Error',
                            message: 'API Key is missing',
                        };
                    }
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/recording`,
                        headers: {
                            'x-api-key': credential.data.apiKey,
                            Accept: 'application/json',
                        },
                    };
                    try {
                        await this.helpers.request(options);
                        return {
                            status: 'OK',
                            message: 'Connection successful!',
                        };
                    }
                    catch (error) {
                        return {
                            status: 'Error',
                            message: `Connection failed: ${error.message}`,
                        };
                    }
                },
            },
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const baseUrl = 'https://get-demo-backend-prod.getdemo.com.br/api/external/v1';
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                if (resource === 'recording' && operation === 'list') {
                    const options = {
                        method: 'GET',
                        url: `${baseUrl}/recording`,
                        headers: {
                            Accept: 'application/json',
                        },
                    };
                    const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'getdemoApi', options);
                    if (Array.isArray(responseData)) {
                        for (const item of responseData) {
                            returnData.push({
                                json: item,
                                pairedItem: { item: i },
                            });
                        }
                    }
                    else {
                        returnData.push({
                            json: responseData,
                            pairedItem: { item: i },
                        });
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                    itemIndex: i,
                });
            }
        }
        return [returnData];
    }
}
exports.Getdemo = Getdemo;
//# sourceMappingURL=Getdemo.node.js.map