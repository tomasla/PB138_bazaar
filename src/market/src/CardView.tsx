import React, { Component, FunctionComponent, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CardItem } from "./CardItem";
import dataList from "./tempData";

export const CardView: FunctionComponent = () => {
  const [data, setData] = React.useState([]);


  useEffect(() => {
      getAds()
  });


  const getAds = async () => {
    const url = `http://localhost:8080/ads`;
    const response = await fetch(url);
    const dataObject = await response.json();
    const dataArray:any= Object.values(dataObject);
    setData(dataArray);
  };

  const getItemCard = (dataObject: any) => {
    return (
      <Grid item xs={12} sm={4} key={dataObject.id}>
        <CardItem {...dataObject} />
      </Grid>
    );
  };

  return (
    <Grid container>{data.map((dataObject) => getItemCard(dataObject))}</Grid>
  );
};
