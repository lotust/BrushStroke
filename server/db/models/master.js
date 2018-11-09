// import {generateId} from 'dolphinsr'
const Sequelize = require('sequelize')
const db = require('../db')

const combinations = [{front: [0], back: [1, 2]}]

const Master = db.define('master', {
  combinations: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: combinations
  },
  fields: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Master
