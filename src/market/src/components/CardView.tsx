import React, { FunctionComponent, useEffect } from "react";
import { Grid, Input } from "@material-ui/core";
import { CardItem } from "./CardItem";
import axios from "axios";

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
    console.log(data);

    return (
      <Grid item xs={12} sm={4} key={dataObject.id}>
        <CardItem {...dataObject} />
      </Grid>
    );
  };

  // just for testing purpose
  const clickHandler = async () => {
    await axios.post("http://localhost:3000/ads", {
      name: "Intel pentium",
      description: "Super intel pentium",
      category: "Computers",
      img:
        "https://images.pexels.com/photos/163143/sackcloth-sackcloth-textured-laptop-ipad-163143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: 2000,
      date: "2020-05-10T09:39:18.692Z",
      contact: {
        email: "new@sth.cz",
        name: "Ivan",
        surname: "Starý",
        phone: "938472837",
      },
    });
    await getAds();
  };

  //not working yet
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
    <div>
    <Grid item sm={2} xs={false}></Grid>
    <Grid item xs={10} sm={8}>
      <React.Fragment>
        <Input
          id="filled-basic"
          type="text"
          placeholder="search item here"
          onChange={changeHandler}
        />

        <Grid container>{data.map((dataObject) => getItemCard(dataObject))}</Grid>
        <button type="button" onClick={clickHandler}>
          Clicking will add random product to DB and display all tasks
        </button>
        <button type="button" onClick={clickHandlerSort}>
          sort
        </button>
      </React.Fragment>
    </Grid>
    <Grid item sm={2} xs={false}></Grid>
    </div>
  );
};
