import React, {Component} from 'react'
import {connect} from 'react-redux'
import {HanziQuiz} from './index'
import {getReviewsThunk} from '../store/reviews'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class QuizLoader extends Component {
  async componentDidMount() {
    await this.props.getReviews()
  }
  render() {
    const {classes} = this.props
    if (this.props.reviews.length)
      return <HanziQuiz reviews={this.props.reviews} />
    else {
      return <CircularProgress className={classes.progress} />
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

QuizLoader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(QuizLoader)
)
