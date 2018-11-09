const router = require('express').Router()
const {User, Reviews, DictionaryHSK1} = require('../db/models')

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

module.exports = router
