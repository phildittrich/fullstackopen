import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer