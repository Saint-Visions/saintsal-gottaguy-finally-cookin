"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFieldFromPath_1 = require("./getFieldFromPath");
var linkTypeMap_1 = require("./linkTypeMap");
describe('getFieldFromPath', function () {
    test('gets nested field definition', function () {
        var typeMap = linkTypeMap_1.linkTypeMap({
            Some: {
                name: 'Some',
                fields: {
                    other: { type: 'Other' },
                    unknown: { type: 'Unknown' },
                },
            },
            Other: {
                name: 'Other',
                fields: {
                    some: { type: 'Some' },
                    scalar: { type: 'Scalar' },
                    unknown: { type: 'Unknown' },
                    union: { type: 'Union' },
                },
            },
            Union: {
                name: 'Union',
                fields: {
                    on_Some: { type: 'Some' },
                },
            },
            Scalar: {
                name: 'Scalar',
            },
        });
        expect(getFieldFromPath_1.getFieldFromPath(typeMap['Some'], ['other', 'some', 'other', 'scalar'])).toBe(typeMap.Other.fields.scalar);
        expect(getFieldFromPath_1.getFieldFromPath(typeMap['Other'], ['union', 'other'])).toBe(typeMap.Some.fields.other);
    });
    describe('throws an error', function () {
        test('when root is not provided', function () {
            return expect(function () { return getFieldFromPath_1.getFieldFromPath(undefined, ['some']); }).toThrow('root type is not provided');
        });
        test('when the path is empty', function () { return expect(function () { return getFieldFromPath_1.getFieldFromPath({ name: 'Root' }, []); }).toThrow('path is empty'); });
        test('when requesting a field on a type without fields', function () {
            return expect(function () { return getFieldFromPath_1.getFieldFromPath({ name: 'Root' }, ['field']); }).toThrow('type `Root` does not have fields');
        });
        test("when requesting a field on a type that doesn't have it", function () {
            return expect(function () {
                var typeMap = linkTypeMap_1.linkTypeMap({
                    Root: {
                        name: 'Root',
                        fields: {
                            some: { type: 'Some' },
                        },
                    },
                });
                getFieldFromPath_1.getFieldFromPath(typeMap.Root, ['other']);
            }).toThrow('type `Root` does not have a field `other`');
        });
    });
});
//# sourceMappingURL=getFieldFromPath.test.js.map