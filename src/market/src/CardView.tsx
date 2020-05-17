import React, { Component } from 'react'
import { Grid } from "@material-ui/core";
import { CardItem } from './CardItem';
import dataList from "./tempData";





export default class CardView extends Component {

    getItemCard = (dataObject:any) => {
        return (
          <Grid item xs={12} sm={4} key={dataObject.id}><CardItem {...dataObject}/></Grid>
        );
      };

    render() {
        return (
            <Grid container>
                {dataList.map(dataObject => this.getItemCard(dataObject))}
            </Grid>
        )
    }
}
