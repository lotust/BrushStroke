import React, {Component} from 'react'
import {connect} from 'react-redux'
import {default as reviewer} from '../functions'
import {getReviewsThunk, updateReviewThunk} from '../store/reviews'

// const DolphinSR = require('dolphinsr');
import HanziWriter from 'hanzi-writer'

class HanziQuiz extends Component {
  state = {
    totalStrokes: 0,
    reviewData: {}
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
        onCorrectStroke: strokes => {
          // this.setState({mistakeStrokes: this.state.mistakeStrokes + strokes.mistakesOnStroke})
          this.setState({totalStrokes: this.state.totalStrokes + 1})
        },
        onComplete: summaryData => {
          const score = reviewer(
            4.999 * (1 - summaryData.totalMistakes / this.state.totalStrokes),
            this.props.reviews[0].schedule,
            this.props.reviews[0].factor
          )
          console.log(score)
          this.props.updateReview({
            ...score,
            char: word.character
          })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <div id="character-target-div" />
        <div onClick={() => this.handleClick}> Load new Character </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {reviews: state.reviews, user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(getReviewsThunk()),
    updateReview: data => dispatch(updateReviewThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HanziQuiz)
