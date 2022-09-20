"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
var path_1 = __importDefault(require("path"));
var PORT = 5000;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use('/api', (0, morgan_1.default)('short'), index_1.default);
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
// start express server
app.listen(PORT);
exports.default = app;
