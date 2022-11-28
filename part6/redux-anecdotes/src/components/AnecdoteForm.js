import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
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