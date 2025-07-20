"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prettify_1 = require("../../helpers/prettify");
var RenderContext_1 = require("./RenderContext");
describe('RenderContext', function () {
    test('prettify', function () {
        var ctx = new RenderContext_1.RenderContext();
        ctx.addCodeBlock('interface A{}');
        expect(ctx.toCode('typescript')).toBe(prettify_1.prettify("interface A{}", 'typescript'));
    });
    test('raw', function () {
        var ctx = new RenderContext_1.RenderContext();
        ctx.addCodeBlock('raw string');
        expect(ctx.toCode()).toBe('raw string');
    });
});
//# sourceMappingURL=RenderContext.test.js.map