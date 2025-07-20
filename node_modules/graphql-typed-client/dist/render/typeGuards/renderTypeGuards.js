"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var excludedTypes_1 = require("../common/excludedTypes");
var renderTypeGuard = function (target, possible) { return "\n  const " + target + "_possibleTypes = [" + possible.map(function (t) { return "'" + t + "'"; }).join(',') + "]\n  export const is" + target + " = (obj: { __typename: String }): obj is " + target + " => {\n    if (!obj.__typename) throw new Error('__typename is missing')\n    return " + target + "_possibleTypes.includes(obj.__typename)\n  }\n"; };
exports.renderTypeGuards = function (schema, ctx) {
    for (var name_1 in schema.getTypeMap()) {
        if (excludedTypes_1.excludedTypes.includes(name_1))
            continue;
        var type = schema.getTypeMap()[name_1];
        if (graphql_1.isUnionType(type)) {
            var types = type.getTypes().map(function (t) { return t.name; });
            ctx.addCodeBlock(renderTypeGuard(type.name, types));
        }
        else if (graphql_1.isInterfaceType(type)) {
            var types = schema.getPossibleTypes(type).map(function (t) { return t.name; });
            ctx.addCodeBlock(renderTypeGuard(type.name, types));
        }
        else if (graphql_1.isObjectType(type)) {
            ctx.addCodeBlock(renderTypeGuard(type.name, [type.name]));
        }
    }
};
//# sourceMappingURL=renderTypeGuards.js.map