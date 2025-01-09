import React from 'react';

import { range } from '../../utils'
import { NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS } from '../../constants'
import { checkGuess } from '../../game-helpers'

import { sample } from '../../utils';
import { WORDS } from '../../data';

import GuessList from '../GuessList'
import GuessInput from '../GuessInput'
import Banner from '../Banner'

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const guessesScaffold = range(NUM_OF_GUESSES_ALLOWED).map(() => {
  return { id: crypto.randomUUID(), label: '', letters: range(NUM_OF_LETTERS).map(() => {
    return { id: crypto.randomUUID(), letter: '', status: '' }
  }) }
})

function Game() {
  const [guesses, setGuesses] = React.useState(guessesScaffold)
  const [guessWords, setGuessWords] = React.useState([])
  const [winState, setWinState] = React.useState("")

  function letterCheck(letter, answer) {
    //dummy check:
    if (answer.letter === letter) {
      return answer.status
    } else {
      console.error("Error - answer key letter does not match guess letter")
      return "incorrect"
    }
  }

  function evaluateWinCondition(answerObject) {
    if (answerObject.every((letter) => letter.status === "correct")) {
      setWinState("win")
    } else if (guessWords.length == NUM_OF_GUESSES_ALLOWED - 1) { //hacky?
      setWinState("lose")
    }
  }

  function addGuess(newGuessWord) {
    if (guessWords.length == NUM_OF_GUESSES_ALLOWED) {
      return
    }
    const answerObject = checkGuess(newGuessWord, answer)
    const newGuesses = [...guesses]
    const newGuess = { id: crypto.randomUUID(), label: newGuessWord, letters: newGuessWord.split('').map((letter, i) => {
      return { id: crypto.randomUUID(), letter, status: letterCheck(letter, answerObject[i]) }
    }) }
    newGuesses[guessWords.length] = newGuess

    setGuessWords([...guessWords, newGuessWord])
    setGuesses(newGuesses)

    //the above state changes will not affect this method call.  see 'hacky' comment in function
    evaluateWinCondition(answerObject)
  }

  return (
    <>
      <Banner winState={winState} numGuesses={guessWords.length} answer={answer} />
      <GuessList guesses={guesses} />
      <GuessInput addGuess={addGuess} winState={winState} />
    </>
  );
}

export default Game;
