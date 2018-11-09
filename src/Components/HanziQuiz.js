import React, { Component } from 'react';

// const DolphinSR = require('dolphinsr');
import HanziWriter from 'hanzi-writer';

class App extends Component {
  state = {
    mistakes: 0,
  };
  componentDidMount() {
    console.log('mounted');
    const writer = HanziWriter.create('character-target-div', this.props.word, {
      width: 250,
      height: 250,
      showCharacter: false,
      padding: 5,
      showOutline: false,
    });
    writer.quiz({
      onComplete: summaryData => {
        this.setState({ mistakes: summaryData.totalMistakes });
      },
    });
  }
  render() {
    return <div id="character-target-div" />;
  }
}

export default App;
