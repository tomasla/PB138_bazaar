import React, { ChangeEvent, Component } from "react";
import TextField from "@material-ui/core/TextField";
import { inject, observer } from "mobx-react";
import { AdStore } from "../stores/AdStore";
import { Button, Container } from "@material-ui/core";
import { Ad } from "../../../market-api/src/entity/Ad";
import FormControl from "@material-ui/core/FormControl";

interface IAddAdProps {
  adStore?: AdStore;
}

interface IAddAdState {
  nameInput: string;
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
}

@inject("adStore")
@observer
export class AddAd extends Component<IAddAdProps, IAddAdState> {
  constructor(props: IAddAdProps) {
    super(props);
    this.state = {
      nameInput: " ",
      descriptionInput: " ",
      categoryInput: " ",
      priceInput: 0,
      contactNameInput: " ",
      emailInput: " ",
      surnameInput: " ",
      phoneInput: " ",
      cityInput: " ",
    };
  }

  inputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

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

  submitForm = (event: React.FormEvent) => {
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
            />
            <select id="standard-basic">
              <option value="cars" >Cars</option>
              <option value="moto">Moto</option>
              <option value="pc">PC, Laptops</option>
              <option value="phones">Phones</option>
              <option value="realits" >Realits</option>
              <option value="sport">Sport</option>
              <option value="animals">Animals</option>
              <option value="clothes">Clothes</option>
              <option value="music" >Music</option>
              <option value="garden">House & Garden</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="children" >Children</option>
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
            />
            <TextField
              id="standard-basic"
              type="file"
              label="Gallery"
              inputProps={{ multiple: true }}
              onChange={this.galleryInputHandler}
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
            />
            <TextField
              id="standard-basic"
              name="contactNameInput"
              label="Name"
              value={this.state.contactNameInput}
              onChange={this.inputValueChanged}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="standard-basic"
              name="surnameInput"
              label="Surname"
              value={this.state.surnameInput}
              onChange={this.inputValueChanged}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="standard-basic"
              name="emailInput"
              label="Email"
              value={this.state.emailInput}
              onChange={this.inputValueChanged}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="standard-basic"
              name="phoneInput"
              label="Phone num."
              value={this.state.phoneInput}
              onChange={this.inputValueChanged}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="standard-basic"
              name="cityInput"
              label="City"
              value={this.state.cityInput}
              onChange={this.inputValueChanged}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
          <Button variant="contained" type="submit" color="primary">
            Add
          </Button>
        </form>
      </Container>
    );
  }
}
