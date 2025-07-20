"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var comment_1 = require("../common/comment");
var renderTyping_1 = require("../common/renderTyping");
exports.objectType = function (type, ctx) {
    var fields = Object.keys(type.getFields()).map(function (fieldName) { return type.getFields()[fieldName]; });
    if (!ctx.schema)
        throw new Error('no schema provided');
    var typeNames = graphql_1.isObjectType(type) ? [type.name] : ctx.schema.getPossibleTypes(type).map(function (t) { return t.name; });
    var fieldStrings = fields
        .map(function (f) { return "" + comment_1.fieldComment(f) + f.name + renderTyping_1.renderTyping(f.type, false, false); })
        .concat(["__typename:" + (typeNames.length > 0 ? typeNames.map(function (t) { return "'" + t + "'"; }).join('|') : 'String')]);
    var interfaceNames = graphql_1.isObjectType(type) ? type.getInterfaces().map(function (i) { return i.name; }) : [];
    ctx.addCodeBlock(comment_1.typeComment(type) + "export interface " + type.name + (interfaceNames.length > 0 ? " extends " + interfaceNames.join(',') : '') + "{" + fieldStrings.join(',') + "}");
};
//# sourceMappingURL=objectType.js.map