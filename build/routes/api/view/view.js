"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./utilities/resize"));
var makeDir_1 = __importDefault(require("./utilities/makeDir"));
var writeThumbImage_1 = __importDefault(require("./utilities/writeThumbImage"));
var path_1 = __importDefault(require("path"));
var joi_1 = __importDefault(require("joi"));
var fs_1 = require("fs");
var dimensionSchema = joi_1.default.object({
    width: joi_1.default.string().regex(/^[0-9]+$/),
    height: joi_1.default.string().regex(/^[0-9]+$/)
});
var thumbnailDir = './src/assets/images/thumbnails';
var imageDir = './src/assets/images';
var options = {
    root: path_1.default.join(thumbnailDir)
};
var view = express_1.default.Router();
view.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var width, height, error, imageName, thumbnailName, fileNames, thumbnailNames, output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                width = req.query.width ? req.query.width : '200';
                height = req.query.height ? req.query.height : '200';
                error = dimensionSchema.validate({ width: width, height: height }).error;
                if (error) {
                    res.status(400).send('Error 400: ' + error.message);
                    return [2 /*return*/];
                }
                imageName = req.query.filename + '.jpg';
                thumbnailName = ((req.query.filename + '_' + width) + '_' + height) + '.jpg';
                return [4 /*yield*/, fs_1.promises.readdir(path_1.default.join(imageDir))];
            case 1:
                fileNames = _a.sent();
                if (!fileNames.includes(imageName)) {
                    res.status(404).send('Error 404: image does not exist on the server');
                    return [2 /*return*/];
                }
                //make thumbnail directory if it doesn't exist already
                return [4 /*yield*/, (0, makeDir_1.default)(thumbnailDir)
                    //load list of existing file in the directory and check if the required file already exists
                ];
            case 2:
                //make thumbnail directory if it doesn't exist already
                _a.sent();
                return [4 /*yield*/, fs_1.promises.readdir(path_1.default.join(thumbnailDir))];
            case 3:
                thumbnailNames = _a.sent();
                if (!thumbnailNames.includes(thumbnailName)) return [3 /*break*/, 4];
                res.sendFile(thumbnailName, options);
                return [2 /*return*/];
            case 4: return [4 /*yield*/, (0, resize_1.default)(imageName, parseInt(height), parseInt(width), imageDir)
                //save the thumbnail
            ];
            case 5:
                output = _a.sent();
                //save the thumbnail
                return [4 /*yield*/, (0, writeThumbImage_1.default)(thumbnailDir, thumbnailName, output)];
            case 6:
                //save the thumbnail
                _a.sent();
                res.sendFile(thumbnailName, options);
                return [2 /*return*/];
        }
    });
}); });
exports.default = view;
