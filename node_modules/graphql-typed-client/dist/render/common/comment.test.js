"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_tags_1 = require("common-tags");
var comment_1 = require("./comment");
exports.stripAndWrap = function (tsa) { return "\n" + common_tags_1.stripIndent(tsa) + "\n"; };
test('deprecated', function () {
    expect(comment_1.comment({ deprecated: 'deprecation reason' })).toBe(exports.stripAndWrap(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    /** @deprecated deprecation reason */\n  "], ["\n    /** @deprecated deprecation reason */\n  "]))));
});
test('deprecated multiline', function () {
    expect(comment_1.comment({ deprecated: 'deprecation\nreason\nmultiline' })).toBe(exports.stripAndWrap(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    /** @deprecated deprecation reason multiline */\n  "], ["\n    /** @deprecated deprecation reason multiline */\n  "]))));
});
test('single line', function () {
    expect(comment_1.comment({ text: 'single line' })).toBe(exports.stripAndWrap(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    /** single line */\n    "], ["\n    /** single line */\n    "]))));
});
test('single line deprecated', function () {
    expect(comment_1.comment({ text: 'single line', deprecated: 'deprecation reason' })).toBe(exports.stripAndWrap(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    /**\n     * @deprecated deprecation reason\n     * single line\n     */\n  "], ["\n    /**\n     * @deprecated deprecation reason\n     * single line\n     */\n  "]))));
});
test('multiline', function () {
    expect(comment_1.comment({ text: 'multiline\ntext' })).toBe(exports.stripAndWrap(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    /**\n     * multiline\n     * text\n     */\n  "], ["\n    /**\n     * multiline\n     * text\n     */\n  "]))));
});
test('multiline deprecated', function () {
    expect(comment_1.comment({ text: 'multiline\ntext', deprecated: 'deprecation reason' })).toBe(exports.stripAndWrap(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    /**\n     * @deprecated deprecation reason\n     * multiline\n     * text\n     */\n  "], ["\n    /**\n     * @deprecated deprecation reason\n     * multiline\n     * text\n     */\n  "]))));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=comment.test.js.map