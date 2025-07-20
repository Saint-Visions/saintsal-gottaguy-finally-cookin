"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkTypeMap = function (typeMap) {
    var linkedTypeMap = JSON.parse(JSON.stringify(typeMap));
    Object.keys(linkedTypeMap).forEach(function (t) {
        var type = linkedTypeMap[t];
        if (type.fields) {
            var fields_1 = type.fields;
            Object.keys(fields_1).forEach(function (f) {
                var field = fields_1[f];
                if (field.args) {
                    var args_1 = field.args;
                    Object.keys(args_1).forEach(function (key) {
                        var arg = args_1[key];
                        if (arg) {
                            var typeName_1 = arg[1];
                            if (typeof typeName_1 === 'string') {
                                if (!linkedTypeMap[typeName_1]) {
                                    linkedTypeMap[typeName_1] = { name: typeName_1 };
                                }
                                arg[1] = linkedTypeMap[typeName_1];
                            }
                        }
                    });
                }
                var typeName = field.type;
                if (typeof typeName === 'string') {
                    if (!linkedTypeMap[typeName]) {
                        linkedTypeMap[typeName] = { name: typeName };
                    }
                    field.type = linkedTypeMap[typeName];
                }
            });
        }
    });
    return linkedTypeMap;
};
//# sourceMappingURL=linkTypeMap.js.map