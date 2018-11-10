const router = require('express').Router()
const {User, Reviews, DictionaryHSK1} = require('../db/models')
const fs = require('fs')

router.get('/', async (req, res, next) => {
  try {
    let reviews = await Reviews.findAll({where: {userId: req.user.id}})
    if (!reviews || reviews.length <= 0) {
      fs.readFile('script/dictionaryHSK1.json', async (err, data) => {
        if (err) throw err
        const dictionaryHSK1 = JSON.parse(data)
        await dictionaryHSK1.forEach(async char => {
          await Reviews.create({
            character: char.Traditional,
            factor: 2.0,
            schedule: 2.5,
            isRepeatAgain: true,
            userId: req.user.id,
            pinyin: char.TonalPinYin,
            definition: char.Definition
          })
        })
        setTimeout(async () => {
          reviews = await Reviews.findAll({where: {userId: req.user.id}})
          res.json(reviews)
        }, 4)
      })
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
    console.log(req.body)
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

// router.put('/', async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const currentRow = await Reviews.find({
//       where: {character: req.body.char, userId: req.user.id}
//     })
//     const affectedRow = currentRow.update(
//       {
//         factor: req.body.factor,
//         schedule: req.body.schedule,
//         isRepeatAgain: req.body.isRepeatAgain
//       },
//       {fields: ['factor', 'schedule', 'isRepeatAgain']}
//     )
//     res.status(201).json(affectedRow)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
