import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn} from "typeorm";
import {Contact} from "./Contact";
import {Image} from "./Image";

@Entity()
export class Ad {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    thumbnail: string;

    @OneToMany(type => Image, image => image.ad)
    images: Image[];

    @Column()
    price: number;
    
    @Column()
    date: Date;
    
    @OneToOne(type => Contact)
    @JoinColumn()
    contact: Contact;
}
