import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getReviewsThunk, updateReviewThunk} from '../store/reviews'

// const DolphinSR = require('dolphinsr');
import HanziWriter from 'hanzi-writer'

class HanziQuiz extends Component {
  state = {
    strokes: 0
  }
  componentDidMount() {
    this.props.getReviews()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviews !== this.props.reviews) {
      const word = this.props.reviews[0]
      const writer = HanziWriter.create(
        'character-target-div',
        word.character,
        {
          width: 250,
          height: 250,
          showCharacter: false,
          padding: 5,
          showOutline: true
        }
      )
      writer.quiz({
        onMistake: strokeData => {
          this.setState({
            strokes:
              strokeData.strokesRemaining > this.state.strokes
                ? strokeData.strokesRemaining
                : this.state.strokes
          })
        },
        onCorrectStroke: strokeData => {
          this.setState({
            strokes:
              strokeData.strokesRemaining > this.state.strokes
                ? strokeData.strokesRemaining
                : this.state.strokes
          })
        },
        onComplete: summaryData => {
          console.log(summaryData.totalMistakes)
        }
      })
    }
  }
  render() {
    return (
      <div>
        Quiz rendered character:<div id="character-target-div" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {reviews: state.reviews}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(getReviewsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HanziQuiz)
