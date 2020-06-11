import React, { FunctionComponent, useEffect } from "react";
import { Grid, Input, Container, Switch, Button } from "@material-ui/core";
import { CardItem } from "./CardItem";
import { Link } from "react-router-dom";
import "./../styles/App.scss";
import { shouldCompute } from "mobx/lib/internal";

interface IProps {
  categoryP: string;
  shouldRender: boolean;
}

export const CardView: FunctionComponent<IProps> = ({categoryP, shouldRender}): any | null => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState("");

  useEffect(() => {
    getAds();
    setCategory(categoryP);
  }, []);

  const getAds = async () => {
    const url = `http://localhost:3000/ads`;
    const response = await fetch(url);
    const dataObject = await response.json();
    const dataArray: any = Object.values(dataObject);
    setData(dataArray);
  };

  const getItemCard = (dataObject: any) => {
    if (category !== "") {
      if (
        (search !== "" &&
          dataObject.name.toLowerCase().indexOf(search.toLowerCase()) === -1) ||
        dataObject.category.toLowerCase() !== category
      ) {
        return null;
      }
    }

    if (category == "") {
      if (
        (search !== "" &&
          dataObject.name.toLowerCase().indexOf(search.toLowerCase()) === -1) 
      ) {
        return null;
      }
    }

    // console.log(data);

    return (
      <Grid item xs={12} sm={4} key={dataObject.id}>
        <CardItem {...dataObject} />
      </Grid>
    );
  };

  const clickHandlerSortDesc = () => {
    data.sort(function (a: any, b: any) {
      return a.price - b.price;
    });
  };
  const clickHandlerSortAsc = () => {
    data.sort(function (a: any, b: any) {
      return b.price - a.price;
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  if (shouldRender) {
    return (
      <Container maxWidth="md">
        <Grid container className="filter-optons">
          <Grid item xs={12} md={4}>
            <Input
              id="filled-basic"
              type="text"
              placeholder="search item here"
              onChange={changeHandler}
            />
          </Grid>
  
          <Grid item xs={6} md={4}>
            <Link to={{ pathname: "/" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={clickHandlerSortDesc}
              >
                sort by price (ascending)
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link to={{ pathname: "/" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={clickHandlerSortAsc}
              >
                sort by price (descending)
              </Button>
            </Link>
          </Grid>
        </Grid>
  
        <Grid container>{data.map((dataObject) => getItemCard(dataObject))}</Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid container className="filter-optons">
        <Grid item xs={12} md={4}>
          <Input
            id="filled-basic"
            type="text"
            placeholder="search item here"
            onChange={changeHandler}
          />
        </Grid>
      </Grid>

      <Grid container>{data.map((dataObject) => getItemCard(dataObject))}</Grid>
    </Container>
  );
};