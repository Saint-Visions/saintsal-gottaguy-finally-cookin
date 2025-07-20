"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relativeImportPath_1 = require("../common/relativeImportPath");
var packageJson = require('../../../package.json');
exports.renderClient = function (schema, ctx) {
    var options = [];
    var queryType = schema.getQueryType();
    var mutationType = schema.getMutationType();
    var subscriptionType = schema.getSubscriptionType();
    if (queryType)
        options.push("queryRoot: typeMap." + queryType.name);
    if (mutationType)
        options.push("mutationRoot: typeMap." + mutationType.name);
    if (subscriptionType)
        options.push("subscriptionRoot: typeMap." + subscriptionType.name);
    var typeMapperImport = ctx.config &&
        ctx.config.output &&
        ctx.config.options &&
        ctx.config.options.typeMapper &&
        relativeImportPath_1.relativeImportPath(ctx.config.output, ctx.config.options.typeMapper.location);
    if (typeMapperImport)
        options.push('typeMapper');
    ctx.addCodeBlock("\n    \"use strict\";\n    var __assign =\n      (this && this.__assign) ||\n      function() {\n        __assign =\n          Object.assign ||\n          function(t) {\n            for (var s, i = 1, n = arguments.length; i < n; i++) {\n              s = arguments[i];\n              for (var p in s)\n                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n            }\n            return t;\n          };\n        return __assign.apply(this, arguments);\n      };\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    var __1 = require(\"" + packageJson.name + "\");\n    " + (typeMapperImport ? "var typeMapper = require(\"" + typeMapperImport + "\").typeMapper;" : '') + "\n    exports.createClient = function(options) {\n      var typeMap = __1.linkTypeMap(require(\"./typeMap.json\"));\n      return __1.createClient(\n        __assign({}, options, {\n          " + options.join(',') + "\n        })\n      );\n    };\n  ");
};
//# sourceMappingURL=renderClient.js.map