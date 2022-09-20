"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
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
app.listen(PORT, function () {
    console.log("Server is starting at port:".concat(PORT));
});
exports.default = app;
//http://localhost:5000/api/view?filename=fjord&width=300&height=500
//http://localhost:5000/api/view?filename=encenadaport&width=800&height=500
//http://localhost:5000/api/view?filename=palmtunnel&width=200&height=500
//http://localhost:5000/api/view?filename=santamonica
//http://localhost:5000/api/view?filename=santamonica&width=300&height=300
//http://localhost:5000/api/view?filename=encenadaport&width=500&height=500
