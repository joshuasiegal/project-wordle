import React from 'react'

function GuessList({ guesses }) {
  return (
    <div className="guess-results">
      { guesses.map((guess) => {
        return <p key={guess.id} className="guess">
          { guess.letters.map((letter) => {
            return <span key={letter.id} className={`cell ${letter.status}`}>{letter.letter}</span>
          }) }
        </p>
      }) }
    </div>
  )
}

export default GuessList