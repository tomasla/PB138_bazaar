import React, { Component } from 'react'
import { Grid } from "@material-ui/core";
import { CardItem } from './CardItem';


export default class CardView extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm={4}><CardItem/></Grid>
                <Grid item xs={12} sm={4}><CardItem/></Grid>
                <Grid item xs={12} sm={4}><CardItem/></Grid>
            </Grid>
        )
    }
}
