"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var excludedTypes_1 = require("../common/excludedTypes");
var objectType_1 = require("./objectType");
var scalarType_1 = require("./scalarType");
var unionType_1 = require("./unionType");
exports.renderTypeMap = function (schema, ctx) {
    var result = {};
    Object.keys(schema.getTypeMap())
        .filter(function (t) { return !excludedTypes_1.excludedTypes.includes(t); })
        .map(function (t) { return schema.getTypeMap()[t]; })
        .map(function (t) {
        if (graphql_1.isObjectType(t) || graphql_1.isInterfaceType(t) || graphql_1.isInputObjectType(t))
            result[t.name] = objectType_1.objectType(t, ctx);
        else if (graphql_1.isUnionType(t))
            result[t.name] = unionType_1.unionType(t, ctx);
        else if (graphql_1.isScalarType(t) || graphql_1.isEnumType(t))
            result[t.name] = scalarType_1.scalarType(t, ctx);
    });
    ctx.addCodeBlock(JSON.stringify(result));
};
//# sourceMappingURL=renderTypeMap.js.map