import React from 'react'

function Banner({ winState, numGuesses, answer }) {
  if (winState == "win") {
    return (<div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong> {numGuesses} {numGuesses > 1 ? 'guesses' : 'guess'}</strong>.
      </p>
      <p><a href="">Reset</a></p>
    </div>)
  }
  if (winState == "lose") {
    return (<div className="sad banner">
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    <p><a href="">Reset</a></p>
  </div>)
  }
  return ''
}

export default Banner