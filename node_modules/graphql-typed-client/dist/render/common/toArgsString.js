"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("./comment");
var renderTyping_1 = require("./renderTyping");
exports.toArgsString = function (field) {
    return "{" + field.args.map(function (a) { return "" + comment_1.argumentComment(a) + a.name + renderTyping_1.renderTyping(a.type, false, true); }).join(',') + "}";
};
//# sourceMappingURL=toArgsString.js.map