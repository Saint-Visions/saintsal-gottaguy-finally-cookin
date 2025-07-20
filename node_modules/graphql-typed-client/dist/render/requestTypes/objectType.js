"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var comment_1 = require("../common/comment");
var toArgsString_1 = require("../common/toArgsString");
var requestTypeName_1 = require("./requestTypeName");
exports.objectType = function (type, ctx) {
    var fieldStrings = Object.keys(type.getFields()).map(function (fieldName) {
        var field = type.getFields()[fieldName];
        var types = [];
        var resolvedType = graphql_1.getNamedType(field.type);
        var resolvable = !(graphql_1.isEnumType(resolvedType) || graphql_1.isScalarType(resolvedType));
        var argsPresent = field.args.length > 0;
        var argsString = toArgsString_1.toArgsString(field);
        var argsOptional = !argsString.match(/[^?]:/);
        if (argsPresent) {
            if (resolvable) {
                types.push("[" + argsString + "," + requestTypeName_1.requestTypeName(resolvedType) + "]");
            }
            else {
                types.push("[" + argsString + "]");
            }
        }
        if (!argsPresent || argsOptional) {
            if (resolvable) {
                types.push("" + requestTypeName_1.requestTypeName(resolvedType));
            }
            else {
                types.push('boolean|number');
            }
        }
        return "" + comment_1.fieldComment(field) + field.name + "?:" + types.join('|');
    });
    if (graphql_1.isInterfaceType(type) && ctx.schema) {
        ctx.schema
            .getPossibleTypes(type)
            .map(function (t) { return "on_" + t.name + "?:" + requestTypeName_1.requestTypeName(t); })
            .forEach(function (s) { return fieldStrings.push(s); });
    }
    fieldStrings.push('__typename?:boolean|number');
    fieldStrings.push('__scalar?:boolean|number');
    ctx.addCodeBlock(comment_1.typeComment(type) + "export interface " + requestTypeName_1.requestTypeName(type) + "{" + fieldStrings.join(',') + "}");
};
//# sourceMappingURL=objectType.js.map