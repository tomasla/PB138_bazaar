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
import { Link } from "react-router-dom";
import { Contact } from "../../../market-api/src/entity/Contact";

interface IProps {

  return (
    <Card className="card">
      <CardActionArea /*onClick={handleCardActionClick}*/>
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
            <Link to={{pathname: `/${id}`, state: {
              name: name,
              description: description,
              price: price,
              date: date,
              contact_name: contact.name,
              contact_surname: contact.surname,
              contact_email: contact.email,
              contact_phone: contact.phone,
              contact_city: contact.city
            }}}>Info</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions > 
        <Grid container justify="space-around">
          <Grid item container xs={6}>
          <LocationOnIcon /> <Typography>{contact.city}</Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={5}>
            <Typography>{price} Kč</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
