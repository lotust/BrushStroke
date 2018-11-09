/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Reviews = db.model('reviews')

describe('Review routes', () => {
  beforeEach(async () => {
    return await db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const fakeReview = {
      factor: 3.221,
      schedule: 2.9,
      isRepeatAgain: false,
      character: '我'
    }
    const fakeReview2 = {
      factor: 1.7,
      schedule: 2.2,
      isRepeatAgain: false,
      character: '的'
    }

    beforeEach(async () => {
      return await Reviews.create(fakeReview)
    })

    it('GET /api/reviews responds with all reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].character).to.be.equal(fakeReview.character)
      // expect(res.body[1].character.to.be.equal(fakeReview2.character))
    })

    it('POST /api/reviews persists a new review in the database', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .send({
          factor: '1.7',
          schedule: '2.2',
          isRepeatAgain: 'false',
          char: '的'
        })
        .expect(201)
      const reviews = await Reviews.findAll()
      expect(reviews.length).to.be.equal(2)
      expect(reviews[1].character).to.be.equal('的')
    })

    it('PUT /api/reviews edits an existing review in the database', async () => {
      const review = await Reviews.find({where: {character: '我'}})
      expect(review.factor).to.be.equal(fakeReview.factor.toString())
      const res = await request(app)
        .put('/api/reviews')
        .send({
          char: '我',
          factor: 1.932,
          schedule: 2.03,
          isRepeatAgain: true
        })
        .expect(201)
      const newreview = await Reviews.findById(res.body.id)
      expect(newreview.character).to.be.equal('我')
      expect(newreview.factor).to.be.equal((1.932).toString())
    })
  })
}) // end describe('Review routes')
