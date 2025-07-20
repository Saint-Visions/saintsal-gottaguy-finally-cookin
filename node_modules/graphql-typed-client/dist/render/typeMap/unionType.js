"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionType = function (type, _) {
    var typeObj = {
        name: type.name,
        fields: type.getTypes().reduce(function (r, t) {
            r["on_" + t.name] = { type: t.name };
            return r;
        }, {}),
    };
    typeObj.fields.__typename = { type: 'String' };
    return typeObj;
};
//# sourceMappingURL=unionType.js.map