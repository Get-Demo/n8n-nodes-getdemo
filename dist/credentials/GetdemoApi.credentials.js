"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetdemoApi = void 0;
class GetdemoApi {
    constructor() {
        this.name = 'getdemoApi';
        this.displayName = 'Getdemo API';
        this.icon = 'file:logo.png';
        this.documentationUrl = 'https://app.getdemo.com.br/docs';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-api-key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://get-demo-backend-prod.getdemo.com.br/api/external/v1',
                url: '/recording',
                method: 'GET',
            },
        };
    }
}
exports.GetdemoApi = GetdemoApi;
//# sourceMappingURL=GetdemoApi.credentials.js.map