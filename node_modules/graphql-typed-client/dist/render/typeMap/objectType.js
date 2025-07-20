"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.objectType = function (type, ctx) {
    var typeObj = {
        name: type.name,
        fields: Object.keys(type.getFields()).reduce(function (r, f) {
            var field = type.getFields()[f];
            var namedType = graphql_1.getNamedType(field.type);
            var fieldObj = { type: namedType.name };
            r[f] = fieldObj;
            var args = field.args || [];
            if (args.length > 0) {
                fieldObj.args = args.reduce(function (r, a) {
                    r[a.name] = [a.type.toString(), graphql_1.getNamedType(a.type).name];
                    return r;
                }, {});
            }
            return r;
        }, {}),
    };
    if (graphql_1.isInterfaceType(type) && ctx.schema) {
        ctx.schema.getPossibleTypes(type).map(function (t) {
            typeObj.fields["on_" + t.name] = { type: t.name };
        });
    }
    typeObj.fields.__typename = { type: 'String' };
    var scalar = Object.keys(type.getFields())
        .map(function (f) { return type.getFields()[f]; })
        .filter(function (f) { return graphql_1.isScalarType(graphql_1.getNamedType(f.type)) || graphql_1.isEnumType(graphql_1.getNamedType(f.type)); })
        .map(function (f) { return f.name; });
    if (scalar.length > 0)
        typeObj.scalar = scalar;
    return typeObj;
};
//# sourceMappingURL=objectType.js.map