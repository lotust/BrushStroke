'use strict'

const db = require('../server/db')
const {User, DictionaryHSK1, Reviews, Master} = require('../server/db/models')
const fs = require('fs')

let dictionaryHSK1
let masterdata
fs.readFile(__dirname + '/dictionaryHSK1.json', (err, data) => {
  if (err) throw err
  dictionaryHSK1 = JSON.parse(data)
  masterdata = dictionaryHSK1.map(e => {
    return {fields: [e.Traditional, e.TonalPinYin, e.Definition]}
  })
})

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //dictionary
  const dictionary = await DictionaryHSK1.bulkCreate(dictionaryHSK1)
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  //

  console.log(`seeded ${dictionary.length} dictionary entries`)
  // console.log(`seeded ${master.length} master vocab data`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
