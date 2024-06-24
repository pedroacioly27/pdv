"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const data_source_1 = require("../data-source");
const Client_1 = require("../entities/Client");
exports.clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
