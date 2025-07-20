"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var ws_1 = __importDefault(require("ws"));
exports.getSubscriptionCreator = function (_a) {
    var uri = _a.uri, options = _a.options;
    var client = new subscriptions_transport_ws_1.SubscriptionClient(uri, __assign({ lazy: true, reconnect: true }, options), ws_1.default);
    var clientObservable = new rxjs_1.Observable(function (subscriber) {
        subscriber.next(client);
        return function () { return client.close(); };
    }).pipe(operators_1.publishReplay(1), operators_1.refCount());
    return function (gql) {
        return clientObservable.pipe(operators_1.concatMap(function (client) {
            return new rxjs_1.Observable(function (subscriber) {
                var s = client.request(gql).subscribe(subscriber);
                return function () { return s.unsubscribe(); };
            });
        }));
    };
};
//# sourceMappingURL=getSubscriptionCreator.js.map