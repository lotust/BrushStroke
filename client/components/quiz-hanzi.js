import React, {Component} from 'react'
import {connect} from 'react-redux'
import {default as reviewer} from '../functions'
import Button from '@material-ui/core/Button'
import {getReviewsThunk, updateReviewThunk} from '../store/reviews'
import HanziWriter from 'hanzi-writer'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  button: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: theme.spacing.unit
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '10vh',
    marginBottom: '10vh',
    padding: 10
  }
})

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
          width: 270,
          height: 270,
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
    const {button, container} = this.props.classes
    return (
      <div className={container}>
        <Paper id="character-target-div" />
        <br />
        <br />
        <Typography variant="h6" component="h3">
          Pronunciation:
        </Typography>
        <Typography variant="h5" component="h2">
          {pinyin}
        </Typography>

        <br />
        <br />
        <Typography variant="h6" component="h3">
          Definition:
        </Typography>
        <Typography variant="h5" component="h2">
          {definition}
        </Typography>
        <br />
        <br />
        <Button type="submit" className={button} onClick={this.nextCard}>
          Next Card
        </Button>
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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(HanziQuiz)
)
