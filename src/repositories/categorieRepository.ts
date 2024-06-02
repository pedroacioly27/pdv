import { AppDataSource } from "../data-source";
import { Categorie } from "../entities/Categorie";

export const categorieRepository = AppDataSource.getRepository(Categorie)
