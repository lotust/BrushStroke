import React, {Component} from 'react'
import {connect} from 'react-redux'
import {default as reviewer} from '../functions'
import {getReviewsThunk, updateReviewThunk} from '../store/reviews'

import HanziWriter from 'hanzi-writer'

class HanziQuiz extends Component {
  state = {
    totalStrokes: 0
  }

  hanziload = {
    load: () => {
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
          this.setState({totalStrokes: this.state.totalStrokes + 1})
        },
        onComplete: summaryData => {
          const quality =
            1 - summaryData.totalMistakes / this.state.totalStrokes
          const score = reviewer(
            5 * quality,
            Number(this.props.reviews[0].schedule),
            Number(this.props.reviews[0].factor)
          )
          this.props.updateReview({
            ...score,
            char: word.character
          })
        }
      })
    }
  }

  componentDidMount() {
    this.hanziload.load()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviews !== this.props.reviews) {
      this.hanziload.load()
    }
  }

  render() {
    return (
      <div>
        <div id="character-target-div" />
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
    updateReview: data => dispatch(updateReviewThunk(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HanziQuiz)
