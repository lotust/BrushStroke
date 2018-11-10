import React, {Component} from 'react'
import {connect} from 'react-redux'
import {HanziQuiz} from './index'
import {getReviewsThunk} from '../store/reviews'

class QuizLoader extends Component {
  async componentDidMount() {
    await this.props.getReviews()
  }
  render() {
    if (this.props.reviews.length)
      return <HanziQuiz reviews={this.props.reviews} />
    else {
      return <div>nothing to display</div>
    }
  }
}

const mapStateToProps = state => {
  return {reviews: state.reviews}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews() {
      dispatch(getReviewsThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizLoader)
