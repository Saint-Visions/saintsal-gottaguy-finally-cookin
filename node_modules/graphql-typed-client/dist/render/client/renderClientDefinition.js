"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectType_1 = require("../chain/objectType");
var requestTypeName_1 = require("../requestTypes/requestTypeName");
var packageJson = require('../../../package.json');
exports.renderClientDefinition = function (schema, ctx) {
    var types = [];
    var imports = [];
    var queryType = schema.getQueryType();
    var mutationType = schema.getMutationType();
    var subscriptionType = schema.getSubscriptionType();
    if (queryType) {
        types.push(requestTypeName_1.requestTypeName(queryType), objectType_1.chainTypeName(queryType, 'Promise'), queryType.name);
        imports.push(requestTypeName_1.requestTypeName(queryType), objectType_1.chainTypeName(queryType, 'Promise'), queryType.name);
    }
    else {
        types.push('never', 'never', 'never');
    }
    if (mutationType) {
        types.push(requestTypeName_1.requestTypeName(mutationType), objectType_1.chainTypeName(mutationType, 'Promise'), mutationType.name);
        imports.push(requestTypeName_1.requestTypeName(mutationType), objectType_1.chainTypeName(mutationType, 'Promise'), mutationType.name);
    }
    else {
        types.push('never', 'never', 'never');
    }
    if (subscriptionType) {
        types.push(requestTypeName_1.requestTypeName(subscriptionType), objectType_1.chainTypeName(subscriptionType, 'Observable'), subscriptionType.name);
        imports.push(requestTypeName_1.requestTypeName(subscriptionType), objectType_1.chainTypeName(subscriptionType, 'Observable'), subscriptionType.name);
    }
    else {
        types.push('never', 'never', 'never');
    }
    ctx.addCodeBlock("\n    import { Client, ClientOptions } from '" + packageJson.name + "'\n    " + (imports.length > 0 ? "import {" + imports.join(',') + "} from './schema'" : '') + "\n    export declare const createClient:(options:ClientOptions)=>Client<" + types.join(',') + ">\n  ");
};
//# sourceMappingURL=renderClientDefinition.js.map