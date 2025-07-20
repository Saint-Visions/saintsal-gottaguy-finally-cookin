"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.getFieldFromPath = function (root, path) {
    var current;
    if (!root)
        throw new Error('root type is not provided');
    if (path.length === 0)
        throw new Error("path is empty");
    path.forEach(function (f) {
        var type = current ? current.type : root;
        if (!type.fields)
            throw new Error("type `" + type.name + "` does not have fields");
        var possibleTypes = Object.keys(type.fields)
            .filter(function (i) { return lodash_1.startsWith(i, 'on_'); })
            .reduce(function (types, fieldName) {
            var field = type.fields && type.fields[fieldName];
            if (field)
                types.push(field.type);
            return types;
        }, [type]);
        var field = null;
        possibleTypes.forEach(function (type) {
            var found = type.fields && type.fields[f];
            if (found)
                field = found;
        });
        if (!field)
            throw new Error("type `" + type.name + "` does not have a field `" + f + "`");
        current = field;
    });
    return current;
};
//# sourceMappingURL=getFieldFromPath.js.map