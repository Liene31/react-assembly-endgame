import { useState } from "react";
import { languages } from "../languages.js";
import clsx from "clsx";

function App() {
  //State variables
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

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
  });

  //Determine content of the game-status depending if the game is lost or won
  function renderGameStatus() {
    if (!isGameOver) {
      return null;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
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
