"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var excludedTypes_1 = require("../common/excludedTypes");
var enumType_1 = require("./enumType");
var objectType_1 = require("./objectType");
var scalarType_1 = require("./scalarType");
var unionType_1 = require("./unionType");
exports.renderResponseTypes = function (schema, ctx) {
    for (var name_1 in schema.getTypeMap()) {
        if (excludedTypes_1.excludedTypes.includes(name_1))
            continue;
        var type = schema.getTypeMap()[name_1];
        if (graphql_1.isEnumType(type))
            enumType_1.enumType(type, ctx);
        if (graphql_1.isUnionType(type))
            unionType_1.unionType(type, ctx);
        if (graphql_1.isScalarType(type))
            scalarType_1.scalarType(type, ctx);
        if (graphql_1.isObjectType(type) || graphql_1.isInterfaceType(type))
            objectType_1.objectType(type, ctx);
    }
};
//# sourceMappingURL=renderResponseTypes.js.map