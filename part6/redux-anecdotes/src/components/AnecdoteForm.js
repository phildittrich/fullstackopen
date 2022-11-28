import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const savedAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(savedAnecdote))
    dispatch(setNotification(`a new anecdote '${anecdote}' has been added`))
    setTimeout(() => {dispatch(clearNotification())}, 5000)
  }
  
  return (
    <form onSubmit={add}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm