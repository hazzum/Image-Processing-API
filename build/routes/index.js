"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var view_1 = __importDefault(require("./api/view/view"));
var routes = express_1.default.Router();
routes.use('/view', view_1.default);
routes.get('/', function (req, res) {
    res.send('visiting the main api route');
});
exports.default = routes;
