const router = require('express').Router()
const {User, Reviews, DictionaryHSK1} = require('../db/models')
const fs = require('fs')

// const findWord = quality => {
//   fs.readFile('script/dictionaryHSK1.json', (err, data) => {
//     if (err) throw err
//     const dictionaryHSK1 = JSON.parse(data)
//     const qualityArr = dictionaryHSK1.filter(
//       o => !o.quality || o.quality === quality
//     )
//     return qualityArr[Math.floor(Math.random() * qualityArr.length)]
//   })
// }

function calcFactor(oldFac, quality) {
  return oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
}

function reviewAssigner(quality, lastSchedule, lastFactor) {
  let newFac
  let curSchedule

  if (!lastSchedule) {
    curSchedule = 1
    newFac = 2.5
  }
  if (lastSchedule === 1) {
    curSchedule = 6
    newFac = 2.5
  }
  if (!quality || quality > 5) {
    quality = 0
  }
  if (quality < 3) {
    curSchedule = lastSchedule
    newFac = lastFactor
  } else {
    newFac = calcFactor(lastFactor, quality)
    if (newFac < 1.3) {
      newFac = 1.3
    }
    curSchedule = Math.round(lastSchedule * newFac)
  }

  return {
    factor: newFac,
    schedule: curSchedule,
    isRepeatAgain: quality < 4
  }
}

router.get('/', async (req, res, next) => {
  try {
    let reviews = await Reviews.findAll({where: {userId: req.user.id}})
    if (!reviews || !reviews.length) {
      fs.readFile('script/dictionaryHSK1.json', (err, data) => {
        if (err) throw err
        const dictionaryHSK1 = JSON.parse(data)
        console.log(dictionaryHSK1)
        dictionaryHSK1.forEach(async char => {
          await Reviews.create({
            character: char.Traditional,
            factor: 2.5,
            schedule: 2.5,
            isRepeatAgain: true,
            userId: req.user.id
          })
        })
      })
      reviews = await Reviews.findAll({where: {userId: req.user.id}})
      res.json(reviews)
    } else {
      res.json(reviews)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    const newReview = await Reviews.create({
      character: req.body.char,
      factor: req.body.factor,
      schedule: req.body.schedule,
      isRepeatAgain: req.body.isRepeatAgain,
      userId: req.user.id
    })
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Reviews.update(
      {
        factor: req.body.factor,
        schedule: req.body.schedule,
        isRepeatAgain: req.body.isRepeatAgain
      },
      {
        where: {character: req.body.char, userId: req.user.id},
        returning: true,
        plain: true
      }
    )
    res.status(201).json(affectedRows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
