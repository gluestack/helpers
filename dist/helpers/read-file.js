"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
var util_1 = __importDefault(require("util"));
exports.readFile = util_1["default"].promisify(fs_1["default"].readFile);
//# sourceMappingURL=read-file.js.map