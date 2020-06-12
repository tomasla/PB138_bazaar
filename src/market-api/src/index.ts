import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ad} from "./entity/Ad";
import {Contact} from "./entity/Contact";
import * as express from "express";
import {Request, Response} from "express";
import cors = require("cors");
import {Image} from "./entity/Image";
import * as multer from "multer";

createConnection().then(async connection => {

    const adRepository = connection.getRepository(Ad);
    const imageRepository = connection.getRepository(Image);

    const ads = await adRepository.find();

    if (ads.length == 0) {

        console.log("There are no ads in the database.");
        console.log("Adding new ads to the database...")

        
        const cont1 = new Contact();
        cont1.email = "milan@buygo.cz";
        cont1.name = "Milan";
        cont1.phone = "872639402";
        cont1.surname = "Slovak";
        cont1.city = "Brno";

        await connection.manager.save(cont1);

        const ad1 = new Ad();
        
        ad1.name = "Macbook";
        ad1.description = "Super cool mac";
        ad1.category = "pc";
        ad1.price = 20000;
        ad1.date = new Date();

        const thumb1 = new Image();
        thumb1.url = "https://www.alza.sk/macbook-pro-13-retina-sk-2019-s-touch-barom-vesmirne-sivy-d5639255.htm?o=2";
        thumb1.id = 123;
        thumb1.ad = ad1;

        await connection.manager.save(thumb1);

        const gallery: Image[] = [];
        for (let i = 0; i < 3; i++) {
            const img: Image = new Image();
            img.ad = ad1;
            img.url = "https://www.alza.sk/macbook-pro-13-retina-sk-2019-s-touch-barom-vesmirne-sivy-d5639255.htm?o=2";
            img.id = i + 300;
            gallery.push(img);
            await connection.manager.save(img);
        }

        ad1.gallery = gallery;


        ad1.thumbnail = thumb1;
        ad1.contact = cont1;

        await connection.manager.save(ad1);
        
        const cont2 = new Contact();
        cont2.email = "user29@aaaauto.cz";
        cont2.name = "Jana";
        cont2.phone = "782615374";
        cont2.surname = "Boháčová";
        cont2.city = "Bratislava";

        await connection.manager.save(cont2);

        const ad2 = new Ad();
        
        ad2.name = "VW Passat";
        ad2.description = "150k km, r. v. 2009";
        ad2.category = "cars";
        ad2.price = 90000;
        ad2.date = new Date();
        ad2.contact = cont2;

        await connection.manager.save(ad2);

        const cont3 = new Contact();
        cont3.email = "user129@mobil.cz";
        cont3.name = "dana";
        cont3.phone = "545454456";
        cont3.surname = "Vindová";
        cont3.city = "Praha";

        await connection.manager.save(cont3);

        const ad3 = new Ad();
        
        ad3.name = "Xiaomi";
        ad3.description = "good used phone - working 100%";
        ad3.category = "phones";
        ad3.price = 25;
        ad3.date = new Date();
        
        ad3.contact = cont3;

        await connection.manager.save(ad3);
         
    }

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 3000;

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}/uploads`)
        },
        filename: function (req, file, cb) {
            console.log(file.mimetype);
            let extension = "";
            if (file.mimetype == "image/jpeg") {
                extension = ".jpg";
            } else if (file.mimetype == "image/png") {
                extension = ".png";
            }
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + extension;
            cb(null, file.fieldname + '-' + uniqueSuffix);
        }
    })

    const upload = multer({storage: storage})

    app.get("/", function (req: Request, res: Response) {
        res.send(`Hello world! ${__dirname}`);
    });

    await app.get(`/ads`, async function (req: Request, res: Response) {
        const allAds = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.contact", "contact")
            .leftJoinAndSelect("ad.thumbnail", "thumbnail")
            .leftJoinAndSelect("ad.gallery", "gallery")
            .getMany();
        res.status(200).json(allAds);
    });

    await app.get(`/ads/:id`, async function (req: Request, res: Response) {
        const allAds = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.contact", "contact")
            .leftJoinAndSelect("ad.thumbnail", "thumbnail")
            .leftJoinAndSelect("ad.gallery", "gallery")
            .getOne();
        res.status(200).json(allAds);
    });

    /**
     * /ad/thumbnail/:id vracia thumbnail vo forme suboru (.jpg)
     * parametrom je id inzeratu
     */
    app.get('/ad/thumbnail/:id', async function (req: Request, res: Response) {
        const ad = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.thumbnail", "thumbnail")
            .where("ad.id = :id", {id: req.params.id})
            .getOne()
        res.status(200).sendFile(ad.thumbnail.url);
    });

    /**
     * /ad/gallery/:id vracia galeriu inzeratu.
     * parametrom je id inzeratu
     */
    app.get('/ad/gallery/:id', async function (req: Request, res: Response) {
        const ad = await adRepository
            .createQueryBuilder("ad")
            .leftJoinAndSelect("ad.gallery", "gallery")
            .where("ad.id = :id", {id: req.params.id})
            .getOne()
        res.status(200).json(ad.gallery);
    });

    /**
     * /ad/gallery/image/:id vracia jeden obrazok vo forme suboru (.jpg)
     * s id = :id
     */
    app.get('/ad/gallery/image/:id', async function (req: Request, res: Response) {
        const image = await imageRepository.findOne(req.params.id);
        res.status(200).sendFile(image.url);
    });

    app.post('/ads', upload.fields(
        [{
            name: 'thumbnail',
            maxCount: 1
        },
            {
                name: 'gallery',
                maxCount: 10
            }
        ]), async function (req: Request, res: Response) {
        const data = JSON.parse(req.body.body);

        await adRepository
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values(data.contact)
            .execute();

        // data.thumbnail = thumbnail;
        // data.gallery = gallery;

        const ad: Ad = {...data};

        const gallery: Image[] = [];

        req.files['gallery'].forEach(function (image) {
            const img: Image = new Image();
            img.url = `${__dirname}/uploads/` + image.filename;
            connection.manager.save(img);
            gallery.push(img);
        });

        const thumbnail: Image = new Image();
        thumbnail.url = `${__dirname}/uploads/` + req.files['thumbnail'][0].filename;
        await connection.manager.save(thumbnail);

        ad.gallery = gallery;
        ad.thumbnail = thumbnail;

        await adRepository.save(ad);

        return res.status(201).send("Data Saved");
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
