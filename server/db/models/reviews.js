const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  factor: {
    type: Sequelize.DECIMAL(6, 3)
  },
  schedule: {
    type: Sequelize.DECIMAL(6, 3)
  },
  isRepeatAgain: {
    type: Sequelize.BOOLEAN
  },
  character: {
    type: Sequelize.STRING
  },
  pinyin: {
    type: Sequelize.STRING
  },
  definition: {
    type: Sequelize.STRING
  }
})

module.exports = Reviews
