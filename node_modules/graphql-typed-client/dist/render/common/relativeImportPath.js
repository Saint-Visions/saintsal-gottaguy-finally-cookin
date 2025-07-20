"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.relativeImportPath = function (from, to) {
    var fromResolved = path_1.default.relative(from, to);
    return fromResolved[0] === '.' ? fromResolved : "./" + fromResolved;
};
//# sourceMappingURL=relativeImportPath.js.map