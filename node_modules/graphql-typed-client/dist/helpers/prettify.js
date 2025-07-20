"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prettier_1 = __importDefault(require("prettier"));
exports.prettify = function (code, parser) {
    return prettier_1.default.format(code, {
        parser: parser,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 125,
    });
};
//# sourceMappingURL=prettify.js.map