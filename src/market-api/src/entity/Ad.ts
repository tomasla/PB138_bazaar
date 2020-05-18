import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Contact} from "./Contact";

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
    img: string;

    @Column()
    price: number;
    
    @Column()
    date: Date;
    
    @OneToOne(type => Contact)
    @JoinColumn()
    contact: Contact;
}
