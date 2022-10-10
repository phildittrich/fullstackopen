import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({name, value}) => <div>{name} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = (values) => values.reduce( (prev, cur) => prev + cur )
  const average = (good, bad, sum) => sum > 0 ? (good - bad) / sum : 0
  const positive = (good, sum) => sum > 0 ? good / sum * 100 : 0

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good+1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral+1)} text='Neutral' />
      <Button handleClick={() => setBad(bad+1)} text='Bad' />

      <Header text='statistics' />
      <Display name ='good' value={good} />
      <Display name ='neutral' value={neutral} />
      <Display name ='bad' value={bad} />
      <Display name ='all' value={sum([good, neutral, bad])} />
      <Display name ='all' value={average(good, bad, sum([good, neutral, bad]))} />
      <Display name ='all' value={positive(good, sum([good, neutral, bad])) + ' %'} />
    </div>
  )
}

export default App