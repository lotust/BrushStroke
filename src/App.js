import React, { Component } from 'react';
import './App.css';
const HanziWriter = require('hanzi-writer');

class App extends Component {
  componentDidMount() {
    var writer = HanziWriter.create('character-target-div', '测', {
      width: 150,
      height: 150,
      showCharacter: false,
      padding: 5,
    });
    writer.quiz();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="character-target-div" />
        </header>
      </div>
    );
  }
}

export default App;
