import React from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  };

  handleClick = () => {
    let endPT = "/api/pets";
    let filter = this.state.filters.type;

    if (filter !== "all") {
      endPT += `?type=${filter}`;
    } 
    return fetch(endPT)
    .then(response => response.json())
    .then(results => this.setState({ pets: results }))
    .catch (err => err)
  };

  onChangeType = ({ target: {value} }) => {
    this.setState({ filters: {...this.state.filters, type: value} });
  };

  onAdoptPet = petID => {
    let pets = this.state.pets.map(pet => {
      return pet.id === petID ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onClick={this.handleClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );

  };

};