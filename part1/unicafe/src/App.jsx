import { useState } from 'react'

const StatisticLine = (props) => {
  const { text, value } = props

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) => {
  const { children, setValue } = props
  return <button onClick={() => setValue((prev) => prev + 1)}>{children}</button>
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = 100 - 100/((neutral + bad) || 1)

  const mt = '2rem'

  if(all === 0 ) return (
    <div style={{ marginTop: mt }}>No feedback given</div>
  )

  const items = [
    { text: 'good', value: good },
    { text: 'neutral', value: neutral },
    { text: 'bad', value: bad },
    { text: 'all', value: all },
    { text: 'average', value: average },
    { text: 'positive', value: positive }
  ]

  return (
    <table style={{ display: 'flex', flexDirection: 'column', marginTop: mt }}>
      <tbody>
        {items.map(item => <StatisticLine key={item.text} {...item} />)}
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Button setValue={setGood}>good {good}</Button>
        <Button setValue={setNeutral}>neutral {neutral}</Button>
        <Button setValue={setBad}>bad {bad}</Button>
      </div>

      <Statistics {...{good, neutral, bad}} />
    </div>
  )
}

export default App
