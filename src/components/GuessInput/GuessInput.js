import { useRef, useEffect, useState } from 'react'

import { NUM_OF_LETTERS } from '../../constants'  

function GuessInput({ addGuess, winState }) {
  const [guess, setGuess] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const inputRef = useRef(null)

  //not part of this lesson, but felt important
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    addGuess(guess)
    setGuess('')

    if (!!winState) {
      setIsDisabled(true)
    }
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input ref={inputRef} disabled={isDisabled} id="guess-input" type="text" maxLength={NUM_OF_LETTERS} pattern={`[A-Z]{${NUM_OF_LETTERS}}`}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}  
      />
    </form>
  )   
}

export default GuessInput