import React, {Component} from 'react'
import {connect} from 'react-redux'
import {default as reviewer} from '../functions'
import {getReviewsThunk, updateReviewThunk} from '../store/reviews'

import HanziWriter from 'hanzi-writer'

class HanziQuiz extends Component {
  state = {
    totalStrokes: 0,
    quizScore: {}
  }

  nextCard = () => {
    const element = document.getElementById('character-target-div')
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
    this.props.updateReview({...this.state.quizScore})
    // this.hanziload()
  }

  hanziload = {
    load: () => {
      let word = this.props.reviews[0]
      let character = word.character.split('')
      character.forEach(elem => {
        const writer = HanziWriter.create('character-target-div', elem, {
          width: 250,
          height: 250,
          showCharacter: false,
          padding: 5,
          showOutline: false
        })
        writer.quiz({
          onCorrectStroke: () => {
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
            this.setState({quizScore: {...score, char: word.character}})
          }
        })
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
    const {pinyin, definition} = this.props.reviews[0]
    return (
      <div>
        <div id="character-target-div" />
        <div>{pinyin}</div>
        <div>{definition}</div>
        <button type="submit" onClick={this.nextCard}>
          Next Card
        </button>
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
