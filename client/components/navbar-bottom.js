import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import List from '@material-ui/icons/List'
import Search from '@material-ui/icons/Search'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {Link} from 'react-router-dom'

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
}

class SimpleBottomNavigation extends React.Component {
  state = {
    value: null,
    open: false,
    searchParams: ''
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false, searchParams: ''})
  }

  handleSearchParams = evt => {
    this.setState({searchParams: evt.target.value, open: false})
  }

  render() {
    const {classes} = this.props
    const {value} = this.state

    return (
      <React.Fragment>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="All"
            icon={<List />}
            component={Link}
            to="/all"
          />
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/home"
          />
          <BottomNavigationAction
            label="Search"
            icon={<Search />}
            onClick={this.handleClickOpen}
          />
        </BottomNavigation>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Search for a Character in learning mode
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="character"
              type="text"
              fullWidth
              value={this.state.searchParams}
              onChange={this.handleSearchParams}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              component={Link}
              to={`/learn/${this.state.searchParams}`}
              color="primary"
            >
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleBottomNavigation)
