"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const data_source_1 = require("../data-source");
const Order_1 = require("../entities/Order");
exports.orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
