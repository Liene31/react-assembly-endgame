import { useState } from "react";
import { languages } from "../languages.js";
import { getFarewellText, getRandomWord } from "../utils.js";
import clsx from "clsx";

function App() {
  //State variables
  //*React will only call the function when it needs the initial value (which is when the component is initially rendered)
  const [currentWord, setCurrentWord] = useState(() => getRandomWord()); //*Lazy state initialization
  const [guessedLetters, setGuessedLetters] = useState([]);

  console.log(currentWord);

  //Static variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastLetterGuessed = guessedLetters.at(-1);
  const lastLetterIsWrong =
    lastLetterGuessed && !currentWord.includes(lastLetterGuessed);

  //Render languages span element
  const languageChipsEl = languages.map((language, index) => {
    const className = `chip ${wrongGuessCount > index ? "lost" : ""}`;
    return (
      <span
        className={className}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });

  //Render current word in word tiles one by one
  const currentWordArr = currentWord.split("");
  const tiles = currentWordArr.map((letter, index) => {
    return (
      <span key={index}>{guessedLetters.includes(letter) ? letter : ""}</span>
    );
  });

  //Render keyboard && adds red/green on the keyboard based on wrong/correct guesses
  const alphabetArr = alphabet.split("");
  const keyboardEl = alphabetArr.map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    //Use clsx for manage the styling based on conditions
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        disabled={isGameOver}
        className={className}
        key={letter}
        onClick={() => handleKeyboardClicks(letter)}
      >
        {letter}
      </button>
    );
  });

  //Handles clicks on keyboard and adds to the guessed letters if already not there
  function handleKeyboardClicks(letter) {
    return setGuessedLetters((prev) => {
      //if array doesn't include the clicked letter
      //return existing array + letter
      //otherwise return the array
      return prev.includes(letter) ? [...prev] : [...prev, letter];
    });
  }

  // Change class in game-status depending if game is lost or won
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && lastLetterIsWrong,
  });

  //Determine content of the game-status depending if the game is lost or won
  function renderGameStatus() {
    if (!isGameOver && lastLetterIsWrong) {
      return (
        <>
          <p className="farewell-text">
            {getFarewellText(languages[wrongGuessCount - 1].name)}
          </p>
        </>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  //RETURN
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="language-chips">{languageChipsEl}</section>
      <section className="word-tiles">{tiles}</section>
      <section className="keyboard">{keyboardEl}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}

export default App;
