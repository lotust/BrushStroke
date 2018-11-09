const Sequelize = require('sequelize')
const db = require('../db')

const DictionaryHSK1 = db.define('dictionaryHSK1', {
  Simplified: {
    type: Sequelize.STRING
  },
  Traditional: {
    type: Sequelize.STRING
  },
  PinYin: {
    type: Sequelize.STRING
  },
  TonalPinYin: {
    type: Sequelize.STRING
  },
  Definition: {
    type: Sequelize.STRING
  }
})

module.exports = DictionaryHSK1
