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

    const getItemCard = (myCategory: any) => {
        return (
            <Grid item xs={12} sm={4}>
              <CardActionArea onClick={() => setCategory(myCategory)}>
                <CardMedia
                component="img"
                alt="product picture"
                height="250"
                image="../../category-img/"
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