"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
//Params变为驼峰
var axios_1 = require("axios");
var path = require("path");
var fs = require("fs");
var prettier = require("prettier");
var index_1 = require("./index");
function sync(config) {
    var _this = this;
    var endpoint = config.endpoint;
    var rootDir = config.rootDir;
    var repositories = config.repositories;
    var includePorts = config.includePorts;
    var cache = getCacheFile(rootDir);
    var _a = prepareCache(cache), moduleCache = _a.moduleCache, interfaceCache = _a.interfaceCache;
    repositories.forEach(function (repository) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!repository.sync) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getRepository(endpoint, repository.id)];
                case 1:
                    data = (_a.sent()).data;
                    data = data.data;
                    data.modules.forEach(function (m) {
                        if (moduleCache[m.id] === m.updatedAt) {
                            return;
                        }
                        m.interfaces.forEach(function (i) { return __awaiter(_this, void 0, void 0, function () {
                            var url, id, name, description, method, requestTemplate, responseTemplate, params, response, array, item, i_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (interfaceCache[i.id] === i.updatedAt) {
                                            return [2 /*return*/];
                                        }
                                        if (!includePorts.some(function (item) { return item.id === i.id; })) {
                                            return [2 /*return*/];
                                        }
                                        url = i.url;
                                        id = i.id;
                                        name = i.name;
                                        description = i.description;
                                        method = i.method;
                                        return [4 /*yield*/, getRequestTemplate(endpoint, id)];
                                    case 1:
                                        requestTemplate = _a.sent();
                                        return [4 /*yield*/, getResponseTemplate(endpoint, id)];
                                    case 2:
                                        responseTemplate = _a.sent();
                                        params = mockjs3ts(requestTemplate.data);
                                        response = mockjs2ts(responseTemplate.data.data);
                                        array = false;
                                        item = null;
                                        console.log('88');
                                        for (i_1 in responseTemplate.data) {
                                            if (i_1.indexOf('data') !== -1 && responseTemplate.data[i_1].length) {
                                                item = responseTemplate.data[i_1][0];
                                                array = true;
                                            }
                                        }
                                        if (item) {
                                            console.log('到了这里');
                                            response = mockjs2ts(item);
                                        }
                                        writeToTs(path.join(rootDir, url), {
                                            name: name,
                                            description: description,
                                            method: method,
                                            url: url,
                                            params: params,
                                            response: response,
                                            array: array
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = sync;
function getRepository(endpoint, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default({
                        url: endpoint + "/repository/get?id=" + id,
                        headers: {
                            'Cookie': 'koa.sid=jiJ6qrXFAacIkDCVfuzFHvip8ZHrPiho; koa.sid.sig=_a7H6NMLqoZRFRqNdyj95P8zB6w'
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getRequestTemplate(endpoint, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default(endpoint + "/app/mock/template/" + id + "?scope=request")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getResponseTemplate(endpoint, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default(endpoint + "/app/mock/template/" + id + "?scope=response")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function mockjs2ts(mockjsObj) {
    return index_1.convert(mockjsObj);
}
function mockjs3ts(mockjsObj) {
    return index_1.convert3(mockjsObj);
}
function writeToTs(dir, options) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    // console.log(path.join(dir, 'index.ts'));
    return fs.writeFileSync(path.join(dir, 'index.ts'), prettier.format("import { ApiMetaProvider } from '@/api';\n            const method = '" + options.method + "';\n            const url = '" + options.url + "';\n            export interface Params " + options.params + "\n            export interface Response " + options.response + "\n            export const metaProvider: ApiMetaProvider<Params, " + (options.array ? 'Array<Response>' : 'Response') + "> = function() {\n                return {\n                    url: url,\n                    method: method\n                };\n            };\n            ", { parser: 'typescript', singleQuote: true, tabWidth: 4 }));
}
function getCacheFile(rootDir) {
    return fs.readFileSync(path.join(rootDir, 'cache.json'), 'utf-8');
}
function prepareCache(cacheFile) {
    var cache = JSON.parse(cacheFile);
    var moduleCache = {};
    var interfaceCache = {};
    cache.modules.forEach(function (repository) {
        moduleCache[repository.id] = repository.updatedAt;
        repository.interfaces.forEach(function (i) {
            i[i.id] = i.updatedAt;
        });
    });
    return {
        moduleCache: moduleCache,
        interfaceCache: interfaceCache
    };
}
