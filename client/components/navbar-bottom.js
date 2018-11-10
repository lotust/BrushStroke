import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import List from '@material-ui/icons/List'
import Search from '@material-ui/icons/Search'

const styles = {
  root: {
    width: 500
  }
}

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {classes} = this.props
    const {value} = this.state

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="All" icon={<List />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
      </BottomNavigation>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleBottomNavigation)
