import React, { useState, FunctionComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from "@material-ui/core";
import { CardView } from "./CardView";

export const Categories: FunctionComponent = () => {
    const categories = ["cars", "moto", "pc", "phones", "realits", "sport", "animals", "clothes", "music", "garden", "furniture", "books", "children", "photo", "electro", "job"]
    const [redirect, setRedirect] = useState(false);
    const [category, setCategory] = useState("");


    let categoriesImg = new Map<string, string>();
    categoriesImg.set("cars", "https://www.buygo.cz/kategorie/car.png");
    categoriesImg.set("moto", "https://www.buygo.cz/kategorie/motor-sports.png");
    categoriesImg.set("pc", "https://www.buygo.cz/kategorie/device-laptop-icon.png");
    categoriesImg.set("phones", "https://www.buygo.cz/kategorie/phone-call.png");
    categoriesImg.set("realits", "https://www.buygo.cz/kategorie/house.png");
    categoriesImg.set("sport", "https://www.buygo.cz/kategorie/bicycle.png");
    categoriesImg.set("animals", "https://www.buygo.cz/kategorie/dog.png");
    categoriesImg.set("clothes", "https://www.buygo.cz/kategorie/dress-shirt.png");
    categoriesImg.set("music", "https://www.buygo.cz/kategorie/music-player.png");
    categoriesImg.set("garden", "https://www.buygo.cz/kategorie/tree.png");
    categoriesImg.set("furniture", "https://www.buygo.cz/kategorie/dining-table.png");
    categoriesImg.set("books", "https://www.buygo.cz/kategorie/books.png");
    categoriesImg.set("photo", "https://www.buygo.cz/kategorie/photo-camera.png");
    categoriesImg.set("electro", "https://www.buygo.cz/kategorie/washing-machine.png");
    categoriesImg.set("children", "https://www.buygo.cz/kategorie/stroller.png");
    categoriesImg.set("job", "https://www.buygo.cz/kategorie/curriculum.png");

    const getItemCard = (myCategory: string) => {
        return (
            <Grid item xs={12} sm={4}>
              <CardActionArea onClick={() => setCategory(myCategory)}>
                <CardMedia
                component="img"
                alt="product picture"
                height="250"
<<<<<<< HEAD
                image="../../category-img/"
=======
                image={categoriesImg.get(myCategory)}
>>>>>>> upstream/master
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {myCategory}
                </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
        );
    }
    
    if (category != ""){
        return (
            <CardView categoryP = {category} shouldRender= {false}/>
        );
    }
    return (
        <Grid container>{categories.map((category) => getItemCard(category))}</Grid>
    );
};