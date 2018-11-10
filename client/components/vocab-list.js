import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getReviewsThunk, updateReviewThunk} from '../store/reviews'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100vw'
  },
  table: {
    minWidth: '100vw',
    minHeight: '100%',
    marginTop: '9vh',
    marginBottom: '9vh'
  },
  row: {
    minHeight: '15vh'
  },
  character: {
    fontSize: '2.5vh',
    padding: '1vh'
  },
  pinyin: {
    fontSize: '1.5vh',
    padding: '1vh'
  }
})

const VocabList = props => {
  const {classes} = props
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell>Character</TableCell>
            <TableCell>PinYin</TableCell>
            <TableCell>Definition</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reviews.map(word => {
            return (
              <TableRow key={word.id} className={classes.row}>
                <TableCell className={classes.character}>
                  {word.character}
                </TableCell>
                <TableCell className={classes.pinyin}>{word.pinyin}</TableCell>
                <TableCell>{word.definition}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

VocabList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {reviews: state.reviews}
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(getReviewsThunk()),
    updateReview: data => dispatch(updateReviewThunk(data))
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(VocabList)
)
