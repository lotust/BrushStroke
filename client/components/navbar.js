import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const style = {
  color: 'white'
}

const backgroundStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
}

const Navbar = ({handleClick, isLoggedIn, classes}) => {
  return (
    <div>
      <AppBar style={backgroundStyle}>
        <Toolbar>
          {isLoggedIn ? (
            <div>
              <Button component={Link} style={style} to="/home">
                Home
              </Button>
              <Button onClick={handleClick} style={style}>
                Log Out
              </Button>
            </div>
          ) : (
            <div>
              <Button component={Link} style={style} to="/login">
                Log In
              </Button>
              <Button component={Link} style={style} to="/signup">
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
// export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
