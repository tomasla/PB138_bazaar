import React, {ChangeEvent, Component} from "react";
import TextField from "@material-ui/core/TextField";
import {inject, observer} from "mobx-react";
import {AdStore} from "../stores/AdStore";
import {Button, Container} from "@material-ui/core";
import {Ad} from "../../../market-api/src/entity/Ad";
import FormControl from "@material-ui/core/FormControl";
import {Snackbar} from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';


interface IAddAdProps {
    adStore?: AdStore;
}

interface IAddAdState {
    nameInput: string
    descriptionInput: string;
    categoryInput: string;
    thumbnailInput?: File;
    galleryInput?: FileList;
    priceInput: number;
    emailInput: string;
    contactNameInput: string;
    surnameInput: string;
    phoneInput: string;
    cityInput: string;
    validForm: boolean;
    open: boolean;
    severity: "success" | "info" | "warning" | "error" | undefined;
    alertMessage: string;
    error: boolean;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

@inject("adStore")
@observer
export class AddAd extends Component<IAddAdProps, IAddAdState> {

    formValidation: boolean = false;

    constructor(props: IAddAdProps) {
        super(props);
        this.state = {
            nameInput: "",
            descriptionInput: "",
            categoryInput: "cars",
            priceInput: 0,
            contactNameInput: "",
            emailInput: "",
            surnameInput: "",
            phoneInput: "",
            cityInput: "",
            validForm: true,
            open: false,
            severity: "success",
            alertMessage: "",
            error: false
        };
    }

    inputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    };

    selectValueChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ...this.state,
            categoryInput: event.target.value
        });
    }

    thumbnailInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files![0]);
        this.setState({
            ...this.state,
            thumbnailInput: event.target.files![0],
        });
    };

    galleryInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        // @ts-ignore
        this.setState({
            ...this.state,
            galleryInput: event.target.files!,
        });
    };

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            open: false
        })
    }

    submitForm = (event: React.FormEvent) => {
        this.formValidation = true;
        let message = "";

        if (this.state.descriptionInput.length < 20) {
            message = message + "\nDescription must be at least 20 characters long.";
            this.formValidation = false;
        }

        if (this.state.nameInput.length < 5) {
            message = message + "\nOffer title must be at least 5 characters long.";
            this.formValidation = false;
        }

        const price = Number(this.state.priceInput);
        if (isNaN(price)) {
            message = message + "\nPrice must be a number";
            this.formValidation = false;
        }

        if (this.state.contactNameInput.length < 2) {
            message = message + "\nName must be at least 2 characters long.";
            this.formValidation = false;
        }

        if (this.state.surnameInput.length < 2) {
            message = message + "\nSurname must be at least 2 characters long.";
            this.formValidation = false;
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailInput))) {
            message = message + "\nYou must enter valid email address.";
            this.formValidation = false;
        }

        if (this.state.phoneInput.length < 12) {
            message = message + "\nEnter a valid phone number.";
            this.formValidation = false;
        }

        if (this.state.cityInput.length < 2) {
            message = message + "\nName of city must be at least 2 characters long.";
            this.formValidation = false;
        }

        if (!(this.state.thumbnailInput instanceof File)) {
            message = message + "\nYou must add a thumbnail.";
            this.formValidation = false;
        }

        if (this.state.galleryInput instanceof FileList) {
            if (this.state.galleryInput.length < 2) {
                message = message + "\nYou must add at least 2 images to the gallery.";
                this.formValidation = false;
            }
        } else {
            message = message + "\nEvery offer should have gallery. Add at least 2 images.";
            this.formValidation = false;
        }

        if (this.formValidation) {
            this.setState({
                ...this.state,
                open: true,
                alertMessage: "Offer added successfully",
                severity: "success"
            }, () => {
                const newAd: Ad = {
                    category: this.state.categoryInput,
                    date: new Date(),
                    description: this.state.descriptionInput,
                    name: this.state.nameInput,
                    price: this.state.priceInput,
                    contact: {
                        email: this.state.emailInput,
                        name: this.state.contactNameInput,
                        phone: this.state.phoneInput,
                        surname: this.state.surnameInput,
                        city: this.state.cityInput,
                    },
                };
                this.props.adStore!.addAd(
                    newAd,
                    this.state.thumbnailInput!,
                    this.state.galleryInput
                );
                this.setState({
                    nameInput: "",
                    descriptionInput: "",
                    categoryInput: "cars",
                    priceInput: 0,
                    contactNameInput: "",
                    emailInput: "",
                    surnameInput: "",
                    phoneInput: "",
                    cityInput: "",
                    validForm: true,
                    error: false
                })
            });
        } else {
            this.setState({
                ...this.state,
                open: true,
                alertMessage: "ERROR" + message,
                severity: "error",
                error: true,
            })
        }
        event.preventDefault();
    };

    render() {
        return (
            <Container maxWidth="md" className="addAd-wrapper">
                <form onSubmit={this.submitForm} noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <h1>Product details</h1>
                        <TextField
                            id="standard-basic"
                            name="nameInput"
                            label="Product name"
                            value={this.state.nameInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="descriptionInput"
                            label="Description"
                            multiline
                            fullWidth
                            rows={10}
                            value={this.state.descriptionInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <select id="standard-basic"
                                value={this.state.categoryInput}
                                onChange={this.selectValueChanged}>
                            <option value="cars">Cars</option>
                            <option value="moto">Moto</option>
                            <option value="pc">PC, Laptops</option>
                            <option value="phones">Phones</option>
                            <option value="realits">Realits</option>
                            <option value="sport">Sport</option>
                            <option value="animals">Animals</option>
                            <option value="clothes">Clothes</option>
                            <option value="music">Music</option>
                            <option value="garden">House & Garden</option>
                            <option value="furniture">Furniture</option>
                            <option value="books">Books</option>
                            <option value="children">Children</option>
                            <option value="photo">Photo</option>
                            <option value="electro">Electro</option>
                            <option value="job">Job offers</option>
                            <option value="any">Jiné</option>
                        </select>
                        <TextField
                            id="standard-basic"
                            type="file"
                            label="Thumbnail"
                            onChange={this.thumbnailInputHandler}
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            type="file"
                            label="Gallery"
                            inputProps={{multiple: true}}
                            onChange={this.galleryInputHandler}
                            error={this.state.error}
                        />
                        <h1 style={{marginTop: "20px"}}>Contact details</h1>
                        <TextField
                            id="standard-basic"
                            name="priceInput"
                            label="Price"
                            value={this.state.priceInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="contactNameInput"
                            label="Name"
                            value={this.state.contactNameInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="surnameInput"
                            label="Surname"
                            value={this.state.surnameInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="emailInput"
                            label="Email"
                            value={this.state.emailInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="phoneInput"
                            label="Phone num."
                            value={this.state.phoneInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                        <TextField
                            id="standard-basic"
                            name="cityInput"
                            label="City"
                            value={this.state.cityInput}
                            onChange={this.inputValueChanged}
                            margin="normal"
                            variant="outlined"
                            error={this.state.error}
                        />
                    </FormControl>
                    <Button variant="contained" type="submit" color="primary">
                        Add
                    </Button>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.severity}>
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </Container>
        );
    }
}
