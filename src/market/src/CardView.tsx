import React, { Component, FunctionComponent, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CardItem } from "./CardItem";
import dataList from "./tempData";
import axios from "axios";

export const CardView: FunctionComponent = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getAds();
  });

  const getAds = async () => {
    const url = `http://localhost:8080/ads`;
    const response = await fetch(url);
    const dataObject = await response.json();
    const dataArray: any = Object.values(dataObject);
    setData(dataArray);
  };

  const getItemCard = (dataObject: any) => {
    return (
      <Grid item xs={12} sm={4} key={dataObject.id}>
        <CardItem {...dataObject} />
      </Grid>
    );
  };

  const clickHandler = () => {
    axios.post("http://localhost:8080/ads", {
        "name": "Intel pentium",
        "description": "Super intel pentium",
        "category": "Computers",
        "price": 2000,
        "date": "2020-05-10T09:39:18.692Z",
        "img_pth": "img/intel.jpg",
        "contact": {
            "email": "new@sth.cz",
            "name": "Ivan",
            "surname": "Starý",
            "phone": "938472837"
        }
    });
      
  }

  return (
    <React.Fragment>
      <Grid container>{data.map((dataObject) => getItemCard(dataObject))}</Grid>
      <button type ="button" onClick={clickHandler}>click me</button>
    </React.Fragment>
  );
};
