"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
var requestTypeName_1 = require("./requestTypeName");
exports.unionType = function (type, ctx) {
    var fieldStrings = type.getTypes().map(function (t) { return "on_" + t.name + "?:" + requestTypeName_1.requestTypeName(t); });
    fieldStrings.push('__typename?:boolean|number');
    ctx.addCodeBlock(comment_1.typeComment(type) + "export interface " + requestTypeName_1.requestTypeName(type) + "{" + fieldStrings.join(',') + "}");
};
//# sourceMappingURL=unionType.js.map