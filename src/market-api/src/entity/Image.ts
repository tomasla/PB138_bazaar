import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Ad} from "./Ad";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url: string;

    @ManyToOne(type => Ad, ad => ad.images, {
        cascade: true
    })
    ad?: Ad;

}