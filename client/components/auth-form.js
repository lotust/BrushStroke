import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 230
  },
  button: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: theme.spacing.unit
  }
})

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} name={name}>
        <TextField
          required
          id="standard-required"
          label="Email (required)"
          placeholder="Email"
          className={classes.textField}
          margin="normal"
          name="email"
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          margin="normal"
          name="password"
        />
        <br />
        <Button type="submit" className={classes.button}>
          {displayName}
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withStyles(styles)(
  connect(mapLogin, mapDispatch)(AuthForm)
)
export const Signup = withStyles(styles)(
  connect(mapSignup, mapDispatch)(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
