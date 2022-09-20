"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../../utilities/resize"));
var makeDir_1 = __importDefault(require("../../utilities/makeDir"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var view = express_1.default.Router();
view.get('/', function (req, res) {
    var FName = req.query.filename + '.jpg';
    var width = req.query.width ? req.query.width : 200;
    var height = req.query.height ? req.query.height : 200;
    var TName = req.query.filename + '_' + width + '_' + height + '.jpg';
    var TDir = './src/assets/images/thumbnails';
    var options = {
        root: path_1.default.join(TDir)
    };
    (0, makeDir_1.default)(TDir, TName).then(function () {
        fs_1.promises.readdir(path_1.default.join(TDir)).then(function (filenames) {
            if (filenames.includes(TName)) {
                console.log('hello fetch');
                res.sendFile(TName, options);
            }
            else {
                console.log('hello resize');
                (0, resize_1.default)(TName, FName, parseInt(height), parseInt(width), TDir).then(function () {
                    return res.sendFile(TName, options);
                });
            }
        });
    });
});
exports.default = view;
