"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../../testHelpers/render");
var objectType_1 = require("./objectType");
test('objectType', function () {
    return render_1.typeRenderTestCase(__dirname, 'objectType', function (type, ctx) { return objectType_1.objectType(type, ctx, 'Promise'); }, ['Object', 'ObjectRequired']);
});
//# sourceMappingURL=index.test.js.map