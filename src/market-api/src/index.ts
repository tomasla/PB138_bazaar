import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ad} from "./entity/Ad";
import {Contact} from "./entity/Contact";
import * as express from "express";
import {Request, Response} from "express";
import cors = require("cors");
import {Image} from "./entity/Image";

createConnection().then(async connection => {
    
    const adRepository = connection.getRepository(Ad);

    const ads = await adRepository.find();

    if (ads.length == 0){

        console.log("There are no ads in the database.");
        console.log("Adding new ads to the database...")

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

        const thumb = new Image();
        thumb.url = "../images/1.jpg";
        thumb.ad = ad1;

        await connection.manager.save(thumb);

        ad1.thumbnail = thumb;
        ad1.price = 20000;
        ad1.date = new Date(Date.now());

        console.log('adding images')

        let i = 2;

        while (i < 5) {
            const image = new Image()
            image.url = `../images/${i}.jpg`;
            image.ad = ad1;
            await connection.manager.save(image);
            i++;
        }
        
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
        ad2.thumbnail = thumb;
        ad2.price = 90000;
        ad2.date = new Date(Date.now());
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
        ad3.thumbnail = thumb;
        ad3.price = 25;
        ad3.date = new Date(Date.now());
        
        ad3.contact = cont3;

        await connection.manager.save(ad3);
    }

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 3000;

    app.get("/", function (req: Request, res: Response) {
        res.send("Hello world!");
    });

    await app.get(`/ads`, async function (req: Request, res: Response) {
        const allAds = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.contact", "contact")
            .leftJoinAndSelect("ad.images", "images")
            .getMany();
        res.send(allAds, 200);
    });

    await app.get(`/ads/:id`, async function (req: Request, res: Response) {
        const allAds = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.contact", "contact")
            .getOne();
        res.send(allAds, 200);
    });

    app.post('/ads', async function (req: Request, res: Response){
        await adRepository
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values(req.body.contact)
            .execute();
        const ad = await adRepository.create(req.body);
        const result = await adRepository.save(ad);
        return res.send(result);
    });

    await app.delete('/ad/:id', async function (req: Request, res: Response) {
        const ad = await adRepository.findOne(req.params.id);
        if (ad instanceof Ad) {
            await connection.createQueryBuilder()
                .delete()
                .from(Ad)
                .where('id = :id', {id: ad.id})
                .execute();
            res.status(200).json('Ad deleted successfully.');
        } else {
            res.status(204).json(`Ad with id: ${req.params.id} does not exist.`);
        }
    })

    app.listen(port);

}).catch(error => console.log(error));
