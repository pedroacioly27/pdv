import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categorie } from "./Categorie";


@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    amount: number

    @Column()
    value: number

    @ManyToOne(() => Categorie, categorie => categorie.products)
    @JoinColumn({
        name: 'categorie_id'
    })
    categorie: Categorie

}