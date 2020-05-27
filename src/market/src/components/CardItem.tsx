import React, {FunctionComponent, useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from "@material-ui/core";
import "./../styles/CardItem.scss";

interface IProps {
  id: number
  name: string;
  description: string;
  price: number;
}

export const CardItem: FunctionComponent<IProps> = ({id,name, description, price
}) => {

  const [thumbnailUrl, setThumbnailUrl] = useState(" ");

  useEffect(() => {
    getThumbnail();
  }, []);

  const getThumbnail = async () => {
    const image = await fetch(`http://localhost:3000/ad/thumbnail/${id}`);
    setThumbnailUrl(image.url);
  }

  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="product picture"
          height="250"
          image={thumbnailUrl}
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
