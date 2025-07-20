"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../../testHelpers/render");
var inputObjectType_1 = require("./inputObjectType");
var objectType_1 = require("./objectType");
var unionType_1 = require("./unionType");
test('unionType', function () { return render_1.typeRenderTestCase(__dirname, 'unionType', unionType_1.unionType, ['Union', 'UnionD', 'UnionMD']); });
test('inputObjectType', function () {
    return render_1.typeRenderTestCase(__dirname, 'inputObjectType', inputObjectType_1.inputObjectType, ['InputF', 'Input', 'InputD', 'InputMD']);
});
test('objectType', function () {
    return render_1.typeRenderTestCase(__dirname, 'objectType', objectType_1.objectType, ['Interface', 'Object', 'InterfaceField']);
});
//# sourceMappingURL=index.test.js.map