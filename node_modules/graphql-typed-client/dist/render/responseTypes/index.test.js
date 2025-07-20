"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../../testHelpers/render");
var enumType_1 = require("./enumType");
var objectType_1 = require("./objectType");
var scalarType_1 = require("./scalarType");
var unionType_1 = require("./unionType");
test('enumType', function () { return render_1.typeRenderTestCase(__dirname, 'enumType', enumType_1.enumType, ['Enum', 'EnumD', 'EnumMD']); });
test('unionType', function () { return render_1.typeRenderTestCase(__dirname, 'unionType', unionType_1.unionType, ['Union', 'UnionD', 'UnionMD']); });
test('scalarType', function () {
    return render_1.typeRenderTestCase(__dirname, 'scalarType', scalarType_1.scalarType, [
        'Int',
        'Float',
        'String',
        'Boolean',
        'ID',
        'Custom',
        'CustomD',
        'CustomMD',
    ]);
});
test('objectType', function () {
    return render_1.typeRenderTestCase(__dirname, 'objectType', objectType_1.objectType, [
        'ObjectI',
        'ObjectF',
        'Object',
        'ObjectD',
        'ObjectMD',
    ]);
});
test('interfaceType', function () {
    return render_1.typeRenderTestCase(__dirname, 'interfaceType', objectType_1.objectType, [
        'InterfaceF',
        'Interface',
        'InterfaceD',
        'InterfaceMD',
    ]);
});
//# sourceMappingURL=index.test.js.map