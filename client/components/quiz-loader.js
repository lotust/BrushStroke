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
    console.log('hi component mounted with props: ', this.props)
    await this.props.getReviews(this.props.user.id)
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
  return {reviews: state.reviews, user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews(id) {
      console.log('hi get reviews was called: ')
      dispatch(getReviewsThunk(id))
    }
  }
}

QuizLoader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(QuizLoader)
)
