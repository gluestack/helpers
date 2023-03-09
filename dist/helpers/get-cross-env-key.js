"use strict";
exports.__esModule = true;
exports.getPrefix = exports.getCrossEnvKey = void 0;
var getCrossEnvKey = function (instance, key) {
    return "".concat((0, exports.getPrefix)(instance), "_").concat(key);
};
exports.getCrossEnvKey = getCrossEnvKey;
var getPrefix = function (instance) {
    return instance.replace(/[^\w\s]/gi, "").toUpperCase();
};
exports.getPrefix = getPrefix;
//# sourceMappingURL=get-cross-env-key.js.map