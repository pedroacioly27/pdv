"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorieRepository = void 0;
const data_source_1 = require("../data-source");
const Categorie_1 = require("../entities/Categorie");
exports.categorieRepository = data_source_1.AppDataSource.getRepository(Categorie_1.Categorie);
