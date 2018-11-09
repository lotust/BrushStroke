const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    console.log('something');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
