import React, {ChangeEvent, Component} from "react";
import TextField from "@material-ui/core/TextField";
import {inject, observer} from "mobx-react";
import {AdStore} from "../stores/AdStore";
import {Button} from "@material-ui/core";
import {Ad} from "../../../market-api/src/entity/Ad";

interface IAddAdProps {
    adStore?: AdStore;
}

interface IAddAdState {
    nameInputValue: string;
    // descriptionInputValue: string;
    // categoryInputValue: string;
    thumbnailInputValue?: File;
    // priceInputValue: number;
}

@inject('adStore')
@observer
export class AddAd extends Component<IAddAdProps, IAddAdState>{

    constructor(props: IAddAdProps) {
        super(props);
        this.state = {
            nameInputValue: " ",
            // descriptionInputValue: " ",
            // categoryInputValue: " ",
            // priceInputValue: 0
        }
    }

    inputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            nameInputValue: event.target.value
        });
    }

    thumbnailInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files![0]);
        this.setState({
            ...this.state,
            thumbnailInputValue: event.target.files![0]
        })
    }

    submitForm = (event: React.FormEvent) => {
        console.log("Form submitted..");
        const newAd: Ad = {
            thumbnail: {
                url: "url.jpg"
            },
            category: "Laptops",
            date: new Date(),
            description: "great new laptop",
            name: this.state.nameInputValue,
            price: 12345,
            contact: {
                email: "email@mail.com",
                name: "Meno",
                phone: "0900709092",
                surname: "Priezvisko"
            },
            images: [
                {
                    url: "../../../market-api/images/2.jpg"
                }
            ]
        }
        this.props.adStore!.addAd(newAd, this.state.thumbnailInputValue!).then(r => console.log(r));
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.submitForm} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" value={this.state.nameInputValue} onChange={this.inputValueChanged}/>
                {/*<TextField id="standard-basic" label="Description" value={this.state.descriptionInputValue}/>*/}
                {/*<TextField id="standard-basic" label="Category" value={this.state.categoryInputValue}/>*/}
                <TextField id="standard-basic" type="file" label="Thumbnail" onChange={this.thumbnailInputHandler}/>
                {/*<TextField id="standard-basic" label="Price" value={this.state.priceInputValue}/>*/}
                <Button variant="contained" type="submit" color="primary">
                    Primary
                </Button>
            </form>
        )}
}