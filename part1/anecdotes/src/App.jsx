import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const size = anecdotes.length
  const getRandom = () => Math.floor(Math.random() * size)

  const [selected, setSelected] = useState(getRandom())
  const [votes, setVotes] = useState(Array.from({length: size}, () => 0))

  const getMostVoted = () => {
    let mostVotes = -Infinity
    let mostVotedIndex

    for(let i = 0; i<votes.length; i++) {
      if(votes[i] > mostVotes) {
        mostVotes = votes[i]
        mostVotedIndex = i
      }
    }

    return mostVotedIndex
  }
  
  const mostVotedAnecdote = getMostVoted()

  const handleVote = () => {
    setVotes(prevVotes => {
      const copy = [ ...prevVotes ]
      copy[selected] += 1

      return copy
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '1.5rem' }}>
        <div>
          <h2>Anecdote of the day</h2>
          <p style={{ height: '3ch' }}>{anecdotes[selected]}</p>
          <span>has {votes[selected]} votes</span>
        </div>

        <div>
          <button style={{ marginRight: '1rem' }} onClick={handleVote}>vote</button>
          <button onClick={() => setSelected(getRandom())}>next anecdote</button>
        </div>
      </div>

      {mostVotedAnecdote !== 0 && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[getMostVoted()]}</p>
        </div>
      )}
    </div>
  )
}

export default App
