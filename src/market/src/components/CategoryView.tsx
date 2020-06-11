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

interface IProps{
    category: string;
    shouldRender: boolean;
}

export const CategoryView: FunctionComponent<IProps> = ({category}) => {
    const [redirect, setRedirect] = useState(false);

    const handleCardActionClick = () => {
        setRedirect(true);
    };

    if (redirect){
        return (
            <CardView categoryP = {category} shouldRender= {false}/>
          );
    }
    return (
        <CardActionArea onClick={handleCardActionClick}>
            <CardMedia
            component="img"
            alt="product picture"
            height="250"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {category}
            </Typography>
            </CardContent>
        </CardActionArea>
    );
};