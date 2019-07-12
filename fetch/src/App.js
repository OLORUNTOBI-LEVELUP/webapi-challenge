    
import React, { Component } from 'react';
//import CharacterList from "./components/CharacterList"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.getCharacters('http://localhost:3000/projects');
  }

  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.
    fetch(URL)
      .then(res => {
        console.log(res)
        return res.json();
        
      })
      .then(data => {
        console.log(data)
        this.setState({ 
          projects: data.project,
         });
      })
      .catch(err => {
        throw new Error(err);
      });
  };
  handleNext = url => {
    this.getCharacters(url)
  }
  render() {
    return (
      <div className="App">
        {this.state.projects}
        
      </div>
    );
  }
}

export default App;