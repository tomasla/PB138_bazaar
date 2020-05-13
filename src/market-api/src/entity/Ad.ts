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
    price: number;

    @Column()
    date: Date;

    @Column()
    img_pth: string;

    @OneToOne(type => Contact)
    @JoinColumn()
    contact: Contact;
}
