"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var comment_1 = require("../common/comment");
var renderTyping_1 = require("../common/renderTyping");
var toArgsString_1 = require("../common/toArgsString");
var requestTypeName_1 = require("../requestTypes/requestTypeName");
var packageJson = require('../../../package.json');
exports.chainTypeName = function (type, wrapper) { return "" + type.name + wrapper + "Chain"; };
exports.objectType = function (type, ctx, wrapper) {
    var fieldStrings = Object.keys(type.getFields()).map(function (fieldName) {
        var field = type.getFields()[fieldName];
        var resolvedType = graphql_1.getNamedType(field.type);
        var stopChain = graphql_1.isListType(field.type) || (graphql_1.isNonNullType(field.type) && graphql_1.isListType(field.type.ofType)) || graphql_1.isUnionType(resolvedType);
        var resolvable = !(graphql_1.isEnumType(resolvedType) || graphql_1.isScalarType(resolvedType));
        var argsPresent = field.args.length > 0;
        var argsOptional = !field.args.find(function (a) { return graphql_1.isNonNullType(a.type); });
        var argsString = toArgsString_1.toArgsString(field);
        var executeReturnType = "" + renderTyping_1.renderTyping(field.type, false, false, false);
        var executeReturnTypeWrapped = wrapper + "<" + executeReturnType + ">";
        var fieldType = resolvable
            ? stopChain
                ? "{execute:(request:" + requestTypeName_1.requestTypeName(resolvedType) + ",defaultValue?:" + executeReturnType + ")=>" + executeReturnTypeWrapped + "}"
                : exports.chainTypeName(resolvedType, wrapper) + "&{execute:(request:" + requestTypeName_1.requestTypeName(resolvedType) + ",defaultValue?:" + executeReturnType + ")=>" + executeReturnTypeWrapped + "}"
            : "{execute:(request?:boolean|number,defaultValue?:" + executeReturnType + ")=>" + executeReturnTypeWrapped + "}";
        var result = [];
        if (argsPresent) {
            result.push("((args" + (argsOptional ? '?' : '') + ":" + argsString + ")=>" + fieldType + ")");
        }
        if (!argsPresent || argsOptional) {
            result.push("(" + fieldType + ")");
        }
        return "" + comment_1.fieldComment(field) + field.name + ":" + result.join('&');
    });
    if (wrapper === 'Observable') {
        ctx.addImport(packageJson.name, false, 'Observable', true, true);
    }
    ctx.addCodeBlock(comment_1.typeComment(type) + "export interface " + exports.chainTypeName(type, wrapper) + "{" + fieldStrings.join(',') + "}");
};
//# sourceMappingURL=objectType.js.map