"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = void 0;
const data_source_1 = require("../data-source");
const Product_1 = require("../entities/Product");
exports.productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
