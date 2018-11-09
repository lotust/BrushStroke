import React, { Component } from 'react';
import { HanziQuiz } from './HanziQuiz';
// import { DolphinSR, generateId } from 'dolphinsr';

class App extends Component {
  render() {
    return <HanziQuiz word="好" />;
  }
}

export default App;
