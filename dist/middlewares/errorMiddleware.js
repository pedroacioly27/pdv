"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = async (err, req, res, next) => {
    var _a;
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    return res.status(statusCode).json({ message: err.message });
};
exports.errorMiddleware = errorMiddleware;
