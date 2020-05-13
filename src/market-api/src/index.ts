import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ad} from "./entity/Ad";
import {Contact} from "./entity/Contact";

createConnection().then(async connection => {
    
    let adRepository = connection.getRepository(Ad);
    let allAds = await adRepository.find();
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
        ad1.img_pth = "img/macbook.jpg";
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
        ad2.img_pth = "img/passat.jpg";
        ad2.contact = cont2;

        await connection.manager.save(ad2);
    }

    const express = require("express");
    const cors = require('cors');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 5000;

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
