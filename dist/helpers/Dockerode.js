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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DockerodeHelper = void 0;
var Dockerode = require("dockerode");
var yaml = require("json-to-pretty-yaml");
var isPortReachable_1 = __importDefault(require("./isPortReachable"));
var DockerodeHelper = (function () {
    function DockerodeHelper() {
    }
    DockerodeHelper.getEnv = function (dockerConfig, envConfig, name) {
        var dockerodeEnv = this.envParser(envConfig);
        return __assign(__assign({}, dockerConfig), { ENV: dockerodeEnv, name: name });
    };
    DockerodeHelper.up = function (dockerConfig, envConfig, hostPort, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var containerByName, containerOptions;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.getContainerByName(name)];
                                case 1:
                                    containerByName = _a.sent();
                                    if (containerByName) {
                                        return [2, resolve({
                                                status: "up",
                                                portNumber: hostPort,
                                                containerId: containerByName.Id
                                            })];
                                    }
                                    containerOptions = this.getEnv(dockerConfig, envConfig, name);
                                    return [4, DockerodeHelper.pullImage(dockerConfig.Image)];
                                case 2:
                                    _a.sent();
                                    this.docker
                                        .createContainer(containerOptions)
                                        .then(function (container) {
                                        var containerId = container.id;
                                        container.start(function (err, data) {
                                            if (err) {
                                                return reject(err);
                                            }
                                        });
                                        return resolve({
                                            status: "up",
                                            portNumber: hostPort,
                                            containerId: containerId
                                        });
                                    })["catch"](function (err) {
                                        return reject(err);
                                    });
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    DockerodeHelper.downByContainerId = function (containerId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var container;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.docker.getContainer(containerId)];
                                case 1:
                                    container = _a.sent();
                                    if (container) {
                                        container.remove({ force: true }, function (err, data) {
                                            if (err) {
                                                if (err.statusCode === 404)
                                                    return resolve(true);
                                                return reject(err);
                                            }
                                            else {
                                                return resolve(true);
                                            }
                                        });
                                    }
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    DockerodeHelper.down = function (containerId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var containerByName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!containerId) return [3, 2];
                                    return [4, this.downByContainerId(containerId)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4, this.getContainerByName(name)];
                                case 3:
                                    containerByName = _a.sent();
                                    if (!containerByName) return [3, 5];
                                    return [4, this.downByContainerId(containerByName.Id)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2, resolve(true)];
                            }
                        });
                    }); })];
            });
        });
    };
    DockerodeHelper.pullImage = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        _this.docker.pull(imageName, function (err, stream) {
                            if (err) {
                                return reject(err);
                            }
                            _this.docker.modem.followProgress(stream, function (err, output) {
                                if (err) {
                                    return reject(err);
                                }
                                console.log();
                                for (var _i = 0, output_1 = output; _i < output_1.length; _i++) {
                                    var item = output_1[_i];
                                    console.log(item.status, item.progress || "");
                                }
                                console.log();
                                return resolve(true);
                            });
                        });
                    })];
            });
        });
    };
    DockerodeHelper.getContainerByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var opts;
            var _this = this;
            return __generator(this, function (_a) {
                opts = {
                    all: true
                };
                return [2, new Promise(function (resolve, reject) {
                        _this.docker.listContainers(opts, function (err, containers) {
                            if (err) {
                                resolve(null);
                            }
                            else {
                                for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
                                    var container = containers_1[_i];
                                    for (var _a = 0, _b = container.Names; _a < _b.length; _a++) {
                                        var Name = _b[_a];
                                        if (Name === "/".concat(name)) {
                                            return resolve(container);
                                        }
                                    }
                                }
                                resolve(null);
                            }
                        });
                    })];
            });
        });
    };
    DockerodeHelper.generateDockerFile = function (dockerConfig, envConfig, name) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                json = this.getEnv(dockerConfig, envConfig, name);
                return [2, yaml.stringify(json)];
            });
        });
    };
    DockerodeHelper.generateDockerFileByContainerId = function (containerId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var docker, container, info, dockerfile, exposedPorts;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    docker = new Dockerode();
                                    container = docker.getContainer(containerId);
                                    return [4, container.inspect()];
                                case 1:
                                    info = _a.sent();
                                    dockerfile = "\nFROM ".concat(info.Config.Image, "\n\n");
                                    if (info.Config.Env) {
                                        dockerfile += "ENV ".concat(info.Config.Env.join("\nENV "), "\n\n");
                                    }
                                    if (info.Config.ExposedPorts) {
                                        exposedPorts = Object.keys(info.Config.ExposedPorts);
                                        dockerfile += "EXPOSE ".concat(exposedPorts.join(" "), "\n");
                                    }
                                    if (info.Config.Entrypoint) {
                                        dockerfile += "ENTRYPOINT ".concat(info.Config.Entrypoint, "\n");
                                    }
                                    if (info.Config.Cmd) {
                                        dockerfile += "CMD ".concat(info.Config.Cmd, "\n");
                                    }
                                    return [2, resolve(dockerfile)];
                            }
                        });
                    }); })];
            });
        });
    };
    DockerodeHelper.getPort = function (port, occupiedPorts, depth) {
        if (occupiedPorts === void 0) { occupiedPorts = []; }
        if (depth === void 0) { depth = 15; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (depth <= 0) {
                            return [2, Promise.reject("Could not find a port number")];
                        }
                        if (!occupiedPorts.includes(port)) return [3, 2];
                        return [4, this.getPort(occupiedPorts[occupiedPorts.length - 1] + 1, occupiedPorts, ++depth)];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, (0, isPortReachable_1["default"])(port, { host: "localhost" })];
                    case 3:
                        res = _a.sent();
                        if (!res) return [3, 5];
                        return [4, this.getPort(port + 1, occupiedPorts, --depth)];
                    case 4: return [2, _a.sent()];
                    case 5: return [2, Promise.resolve(port)];
                }
            });
        });
    };
    DockerodeHelper.envParser = function (envConfig) {
        return Object.keys(envConfig).map(function (key) {
            return "".concat(key, "=").concat(envConfig[key]);
        });
    };
    DockerodeHelper.docker = new Dockerode();
    return DockerodeHelper;
}());
exports.DockerodeHelper = DockerodeHelper;
//# sourceMappingURL=Dockerode.js.map