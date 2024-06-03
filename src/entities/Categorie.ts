import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";


@Entity('categories')
export class Categorie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    description: string

    @OneToMany(() => Product, products => products.categorie)
    products: Product[]
}