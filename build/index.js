"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
//http://localhost:5000/api/view?filename=fjord&width=300&height=500
//http://localhost:5000/api/view?filename=encenadaport&width=800&height=500
//http://localhost:5000/api/view?filename=palmtunnel&width=200&height=500
//http://localhost:5000/api/view?filename=santamonica
//http://localhost:5000/api/view?filename=santamonica&width=300&height=300
//http://localhost:5000/api/view?filename=encenadaport&width=500&height=500
app.use('/api', (0, morgan_1.default)('short'), index_1.default);
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
// add routing for / path
// app.get('/', (_req: Request, res: Response) => {
//   res.json({
//     message: 'Hello World 🌍'
//   })
// })
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at port:".concat(PORT));
});
exports.default = app;
