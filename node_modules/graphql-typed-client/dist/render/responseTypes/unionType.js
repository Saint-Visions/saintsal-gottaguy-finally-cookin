"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
exports.unionType = function (type, ctx) {
    var typeNames = type.getTypes().map(function (t) { return t.name; });
    ctx.addCodeBlock(comment_1.typeComment(type) + "export type " + type.name + "=" + typeNames.join('|'));
};
//# sourceMappingURL=unionType.js.map