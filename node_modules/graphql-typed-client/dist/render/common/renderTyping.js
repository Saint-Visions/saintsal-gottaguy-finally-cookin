"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var render = function (type, nonNull, root, undefinableValues, undefinableFields) {
    if (root) {
        if (undefinableFields) {
            if (graphql_1.isNonNullType(type)) {
                return ":" + render(type.ofType, true, false, undefinableValues, undefinableFields);
            }
            else {
                var rendered = render(type, true, false, undefinableValues, undefinableFields);
                return undefinableValues ? "?:" + rendered : "?:(" + rendered + "|null)";
            }
        }
        else {
            return ":" + render(type, false, false, undefinableValues, undefinableFields);
        }
    }
    if (graphql_1.isNamedType(type)) {
        var typing = type.name;
        if (undefinableValues) {
            return nonNull ? typing : "(" + typing + "|undefined)";
        }
        else {
            return nonNull ? typing : "(" + typing + "|null)";
        }
    }
    if (graphql_1.isListType(type)) {
        var typing = render(type.ofType, false, false, undefinableValues, undefinableFields) + "[]";
        if (undefinableValues) {
            return nonNull ? typing : "(" + typing + "|undefined)";
        }
        else {
            return nonNull ? typing : "(" + typing + "|null)";
        }
    }
    return render(type.ofType, true, false, undefinableValues, undefinableFields);
};
exports.renderTyping = function (type, undefinableValues, undefinableFields, root) {
    if (root === void 0) { root = true; }
    return render(type, false, root, undefinableValues, undefinableFields);
};
//# sourceMappingURL=renderTyping.js.map