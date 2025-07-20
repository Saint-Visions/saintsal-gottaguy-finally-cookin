"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.renderSchema = function (schema, ctx) {
    ctx.addCodeBlock(graphql_1.printSchema(schema, ctx.config && ctx.config.options && ctx.config.options.schemaPrint));
};
//# sourceMappingURL=renderSchema.js.map