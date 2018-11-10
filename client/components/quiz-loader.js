import React, {Component} from 'react'
import {connect} from 'react-redux'
import {HanziQuiz} from './index'
import {getReviewsThunk} from '../store/reviews'

class QuizLoader extends Component {
  componentDidMount() {
    this.props.getReviews()
  }
  render() {
    return <HanziQuiz reviews={this.props.reviews} />
  }
}

const mapStateToProps = state => {
  return {reviews: state.reviews, user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews() {
      dispatch(getReviewsThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizLoader)
