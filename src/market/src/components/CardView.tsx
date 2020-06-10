import React, { FunctionComponent, useEffect } from "react";
import { Grid, Input, Container } from "@material-ui/core";
import { CardItem } from "./CardItem";

export const CardView: FunctionComponent = (): any | null => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getAds();
  }, []);

  const getAds = async () => {
    const url = `http://localhost:3000/ads`;
    const response = await fetch(url);
    const dataObject = await response.json();
    const dataArray: any = Object.values(dataObject);
    setData(dataArray);
  };

  const getItemCard = (dataObject: any) => {
    //search for now working only with name of the product - include description if decided to
    if (
      search !== "" &&
      dataObject.name.toLowerCase().indexOf(search.toLowerCase()) === -1
    ) {
      return null;
    }
    // console.log(data);

    return (
      <Grid item xs={12} sm={4} key={dataObject.id}>
        <CardItem {...dataObject} />
      </Grid>
    );
  };

  //sort working (so far only on page refresh)
  const clickHandlerSort = () => {
    let tempData = data;
    tempData.sort(function (a: any, b: any) {
      return a.price - b.price;
    });
    // setData(tempData);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <Container maxWidth="md">
      <Input
        id="filled-basic"
        type="text"
        placeholder="search item here"
        onChange={changeHandler}
      />

      <button type="button" onClick={clickHandlerSort}>
        sort by price (descending)
      </button>

      <Grid item container>
        {data.map((dataObject) => getItemCard(dataObject))}
      </Grid>
    </Container>
  );
};
