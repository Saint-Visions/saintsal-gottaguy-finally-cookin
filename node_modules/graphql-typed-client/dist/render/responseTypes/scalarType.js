"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
var typeMappedAlias_1 = require("./typeMappedAlias");
var knownTypes = {
    Int: 'number',
    Float: 'number',
    String: 'string',
    Boolean: 'boolean',
    ID: 'string',
};
exports.scalarType = function (type, ctx) {
    if (typeMappedAlias_1.hasTypeMappedAlias(type, ctx))
        typeMappedAlias_1.renderTypeMappedAlias(type, ctx);
    else
        ctx.addCodeBlock(comment_1.typeComment(type) + "export type " + type.name + "=" + (knownTypes[type.name] || 'any'));
};
//# sourceMappingURL=scalarType.js.map