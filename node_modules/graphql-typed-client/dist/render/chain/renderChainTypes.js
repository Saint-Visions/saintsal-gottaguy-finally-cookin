"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var excludedTypes_1 = require("../common/excludedTypes");
var objectType_1 = require("./objectType");
exports.renderChainTypes = function (schema, ctx) {
    for (var name_1 in schema.getTypeMap()) {
        if (excludedTypes_1.excludedTypes.includes(name_1))
            continue;
        var type = schema.getTypeMap()[name_1];
        if (graphql_1.isObjectType(type) || graphql_1.isInterfaceType(type)) {
            objectType_1.objectType(type, ctx, 'Promise');
            objectType_1.objectType(type, ctx, 'Observable');
        }
    }
};
//# sourceMappingURL=renderChainTypes.js.map