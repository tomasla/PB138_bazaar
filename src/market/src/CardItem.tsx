import React, { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from "@material-ui/core";
import "./CardItem.scss";

interface IProps {
  name: string;
  description: string;
  price: number;
  img: string;
}

export const CardItem: FunctionComponent<IProps> = ({
  name,
  description,
  price,
  img,
}) => {



  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="product picture"
          height="250"
          image={img}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Grid container justify="space-around">
          <Grid item container xs={6}>
            <LocationOnIcon /> <Typography>Brno</Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={5}>
            <Typography>{price}€</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
