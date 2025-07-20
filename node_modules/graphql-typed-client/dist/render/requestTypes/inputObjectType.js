"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("../common/comment");
var renderTyping_1 = require("../common/renderTyping");
exports.inputObjectType = function (type, ctx) {
    var fieldStrings = Object.keys(type.getFields()).map(function (fieldName) {
        var field = type.getFields()[fieldName];
        return "" + comment_1.argumentComment(field) + field.name + renderTyping_1.renderTyping(field.type, false, true);
    });
    ctx.addCodeBlock(comment_1.typeComment(type) + "export interface " + type.name + "{" + fieldStrings.join(',') + "}");
};
//# sourceMappingURL=inputObjectType.js.map