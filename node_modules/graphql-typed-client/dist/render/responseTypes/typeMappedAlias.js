"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
exports.hasTypeMappedAlias = function (type, ctx) {
    return ctx.config &&
        ctx.config.options &&
        ctx.config.options.typeMapper &&
        ctx.config.options.typeMapper.types.includes(type.name);
};
exports.renderTypeMappedAlias = function (type, ctx) {
    if (!ctx.config || !ctx.config.options || !ctx.config.options.typeMapper || !ctx.config.output)
        return;
    if (exports.hasTypeMappedAlias(type, ctx)) {
        var alias = ctx.addImport(ctx.config.options.typeMapper.location, false, 'typeMapper');
        ctx.addCodeBlock(comment_1.typeComment(type) + "export type " + type.name + " = ReturnType<typeof " + alias + "." + type.name + ".deserialize>");
    }
};
//# sourceMappingURL=typeMappedAlias.js.map