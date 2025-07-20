"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
exports.enumType = function (type, ctx) {
    var values = type.getValues().map(function (v) { return "" + comment_1.fieldComment(v) + v.name + "='" + v.name + "'"; });
    ctx.addCodeBlock(comment_1.typeComment(type) + "export enum " + type.name + "{" + values.join(',') + "}");
};
//# sourceMappingURL=enumType.js.map