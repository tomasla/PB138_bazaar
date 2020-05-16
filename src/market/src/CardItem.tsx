import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export function CardItem() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="product picture"
          height="200"
          image="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Iphone 10
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            tempore ducimus, ex natus commodi facilis quae debitis repudiandae
            soluta iusto repellendus nemo non blanditiis aperiam. Inventore
            itaque sint soluta laudantium!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-around">
          <Grid item container xs={6}>
            <LocationOnIcon /> <Typography>Brno</Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={5}>
            <Typography>500€</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
