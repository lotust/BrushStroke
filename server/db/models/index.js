const Master = require('./master')
const User = require('./user')
const DictionaryHSK1 = require('./dictionaryhsk1.js')
const Reviews = require('./reviews')

User.hasMany(Reviews)
Reviews.belongsTo(User)
// Reviews.belongsTo(DictionaryHSK1, {
//   foreignKey: 'traditionalCharacter',
//   targetKey: 'Traditional',
//   constraints: false
// })

module.exports = {
  User,
  DictionaryHSK1,
  Reviews,
  Master
}
