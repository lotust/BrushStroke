import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import Button from '@material-ui/core/Button'

import {Form} from 'semantic-ui-react'

const style = {
  color: 'white',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
}

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input name="password" placeholder="Password" />
        </Form.Field>
        <Button type="submit" style={style}>
          {displayName}
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
