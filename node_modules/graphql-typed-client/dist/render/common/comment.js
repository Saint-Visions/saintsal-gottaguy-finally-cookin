"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = function (comment) {
    var lines = [];
    if (comment.deprecated) {
        lines.push("@deprecated " + comment.deprecated.replace(/\s/g, ' '));
    }
    if (comment.text) {
        lines.push.apply(lines, comment.text.split('\n'));
    }
    return lines.length > 0
        ? lines.length === 1
            ? "\n/** " + lines[0] + " */\n"
            : "\n/**\n" + lines.map(function (l) { return " * " + l; }).join('\n') + "\n */\n"
        : '';
};
exports.typeComment = function (type) {
    return exports.comment({
        text: type.description,
    });
};
exports.fieldComment = function (field) {
    return exports.comment({
        deprecated: field.deprecationReason,
        text: field.description,
    });
};
exports.argumentComment = function (arg) {
    return exports.comment({
        text: arg.description,
    });
};
//# sourceMappingURL=comment.js.map