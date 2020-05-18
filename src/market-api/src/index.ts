import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ad} from "./entity/Ad";
import {Contact} from "./entity/Contact";
import express = require("express");
import cors = require("cors");

createConnection().then(async connection => {
    
    const adRepository = connection.getRepository(Ad);
    const allAds = await adRepository.find();
    if (allAds.length == 0){
        const cont1 = new Contact();
        cont1.email = "milan@buygo.cz";
        cont1.name = "Milan";
        cont1.phone = "872639402";
        cont1.surname = "Slovak";

        await connection.manager.save(cont1);

        const ad1 = new Ad();
        ad1.name = "Macbook";
        ad1.description = "Super cool mac";
        ad1.category = "Computers";
        ad1.price = 20000;
        ad1.date = new Date(Date.now());
        ad1.imgPth = "https://ae01.alicdn.com/kf/HLB1iCdKTCzqK1RjSZFLq6An2XXaY/Original-NOKIA-3310-2G-GSM-Unlocked-Mobile-Phone-Good-Cheap-Refurbished-Cellphone.jpg_640x640q70.jpg";
        ad1.contact = cont1;

        await connection.manager.save(ad1);
        
        const cont2 = new Contact();
        cont2.email = "user29@aaaauto.cz";
        cont2.name = "Jana";
        cont2.phone = "782615374";
        cont2.surname = "Boháčová";

        await connection.manager.save(cont2);

        const ad2 = new Ad();
        ad2.name = "VW Passat";
        ad2.description = "150k km, r. v. 2009";
        ad2.category = "Cars";
        ad2.price = 90000;
        ad2.date = new Date(Date.now());
        ad2.imgPth = "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        ad2.contact = cont2;

        await connection.manager.save(ad2);

        const cont3 = new Contact();
        cont3.email = "user129@mobil.cz";
        cont3.name = "dana";
        cont3.phone = "545454456";
        cont3.surname = "Vindová";

        await connection.manager.save(cont3);

        const ad3 = new Ad();
        ad3.name = "Xiaomi";
        ad3.description = "good used phone - working 100%";
        ad3.category = "phones";
        ad3.price = 25;
        ad3.date = new Date(Date.now());
        ad3.imgPth = "https://images.pexels.com/photos/163143/sackcloth-sackcloth-textured-laptop-ipad-163143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        ad3.contact = cont3;

        await connection.manager.save(ad3);
    }


    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 8080;

    app.get(`/ads`, async function(req, res){
        const allAds = await adRepository
        .createQueryBuilder("ad")
        .leftJoinAndSelect("ad.contact", "contact")
        .getMany();
        res.send(allAds, 200);
    });

    app.get(`/ads/:id`, async function(req, res){
        const allAds = await adRepository
        .createQueryBuilder("ad")
        .leftJoinAndSelect("ad.contact", "contact")
        .getOne();
        res.send(allAds, 200);
    });

    app.post('/ads', async function (req, res){
        const cont = await adRepository
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values(req.body.contact)
            .execute();
        req.body.contact;
        const result = await adRepository
            .createQueryBuilder()
            .insert()
            .into(Ad)
            .values(req.body)
            .execute();
        req.body.contact;
        return res.send(result);
    });

    app.listen(port);

}).catch(error => console.log(error));
