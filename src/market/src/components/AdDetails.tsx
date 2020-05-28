import React, { Component } from "react";
import { RouteComponentProps } from 'react-router';
import { AdStore } from "../stores/AdStore";

interface RouteParams {
    id: string
}

export class AdDetails extends Component<RouteComponentProps<RouteParams>>{
    render(){
        const { name } = this.props.location.state;
        const { description } = this.props.location.state;
        const { price } = this.props.location.state;
        const { date } = this.props.location.state;
        const { contact_name } = this.props.location.state;
        const { contact_surname } = this.props.location.state;
        const { contact_email } = this.props.location.state;
        const { contact_phone } = this.props.location.state;
        const { contact_city } = this.props.location.state;
        return (
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <div>Cena: {price}</div>
                <div>Ze dne: {date.toLocaleString("en-US")}</div>
                <h2>Kontakt na prodejce:</h2>
                <div>Jméno: {contact_name} {contact_surname}</div>
                <div>Email: {contact_email}</div>
                <div>Tel: {contact_phone}</div>
                <div>Město: {contact_city}</div>
            </div>
            
        );
    }

    async componentDidMount() {
    }
}