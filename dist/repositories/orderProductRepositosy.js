"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProductRepository = void 0;
const data_source_1 = require("../data-source");
const OrderProduct_1 = require("../entities/OrderProduct");
exports.orderProductRepository = data_source_1.AppDataSource.getRepository(OrderProduct_1.OrderProduct);
