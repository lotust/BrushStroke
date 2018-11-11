import React, {Component} from 'react'
import history from '../history.js'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import HanziWriter from 'hanzi-writer'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
  },
  width: {
    maxWidth: 270,
    alignItems: 'center'
  }
})

class LearnHanzi extends Component {
  state = {
    totalMistakes: 0,
    score: 0,
    totalStrokes: 0,
    open: false,
    word: {}
  }
  goback = () => {
    const element = document.getElementById('character-target-div')
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
    history.push('/all')
  }
  hanziload = {
    load: () => {
      const element = document.getElementById('character-target-div')
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
      let character = this.state.word.character.split('')
      character.forEach(elem => {
        const writer = HanziWriter.create('character-target-div', elem, {
          width: 270,
          height: 270,
          showCharacter: false,
          padding: 5,
          showOutline: true,
          showHintAfterMisses: 1
        })
        writer.quiz({
          onCorrectStroke: () => {
            this.setState({totalStrokes: this.state.totalStrokes + 1})
          },
          onComplete: summaryData => {
            this.setState({
              totalMistakes: summaryData.totalMistakes,
              score:
                (1 - summaryData.totalMistakes / this.state.totalStrokes) * 100,
              open: true
            })
          }
        })
      })
    }
  }
  async componentDidMount() {
    const char = this.props.match.params.character
    const {data} = await axios.get(`/api/reviews/${char}`)
    this.setState({word: data})
    this.hanziload.load()
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.character !== this.props.match.params.character
    ) {
      const char = this.props.match.params.character
      const {data} = await axios.get(`/api/reviews/${char}`)
      this.setState({word: data})
      this.hanziload.load()
    }
  }
  handleClose = () => {
    this.setState({open: false})
  }
  render() {
    const {pinyin, definition} = this.state.word
    const {button, container, width} = this.props.classes
    return (
      <div className={container}>
        <Paper id="character-target-div" className={width} />
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
        {this.state.score ? (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`${
              this.state.score
            }% correct!`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`You missed ${this.state.totalMistakes} of ${
                  this.state.totalStrokes
                } in this word`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Got it!
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        <Button type="submit" className={button} onClick={this.goback}>
          List All
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(LearnHanzi)
