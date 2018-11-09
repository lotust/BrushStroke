const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  master: {
    type: Sequelize.INTEGER
  },
  ts: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  rating: {
    type: Sequelize.ENUM(['easy', 'good', 'hard', 'again']),
    defaultValue: 'again'
  }
})

module.exports = Reviews
