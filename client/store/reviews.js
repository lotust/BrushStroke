import axios from 'axios'

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const UPDATE_REVIEW = 'UPDATE REVIEW'
const CLEAR_REVIEWS = 'CLEAR_REVIEWS'

const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const updateReview = review => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}

export const clearReviews = () => {
  return {
    type: CLEAR_REVIEWS
  }
}

export const getReviewsThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(
      `http://localhost:8080/api/reviews/${Number(userId)}`
    )
    dispatch(getReviews(data))
  } catch (err) {
    console.error(err)
  }
}

export const addReviewThunk = quizdata => async dispatch => {
  try {
    const {data} = await axios.post(
      'http://localhost:8080/api/reviews',
      quizdata
    )
    dispatch(addReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateReviewThunk = quizdata => async dispatch => {
  try {
    const {data} = await axios.put(
      'http://localhost:8080/api/reviews',
      quizdata
    )
    console.log(quizdata)
    dispatch(updateReview(data))
  } catch (err) {
    console.error(err)
  }
}

const handlers = {
  [GET_REVIEWS]: (state, action) => {
    return action.reviews.sort((a, b) => {
      return a.factor - b.factor
    })
  },
  [ADD_REVIEW]: (state, action) => {
    let newArr = [...state, action.review]
    newArr.sort((a, b) => {
      return a.factor - b.factor
    })
  },
  [UPDATE_REVIEW]: (state, action) => {
    let updatedReviewIdx = state.findIndex(
      review => review.id === action.review.id
    )
    const newArr = [...state]
    newArr.splice(updatedReviewIdx, 1, action.review)
    return newArr.sort((a, b) => {
      return a.factor - b.factor
    })
  },
  [CLEAR_REVIEWS]: () => {
    return []
  }
}

export default (state = [], action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  } else {
    return handlers[action.type](state, action)
  }
}
