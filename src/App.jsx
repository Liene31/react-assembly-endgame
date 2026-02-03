import { useState } from "react";
import { languages } from "../languages.js";
import clsx from "clsx";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Render languages span element
  const languageChipsEl = languages.map((language) => {
    return (
      <span
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
    return <span key={index}>{letter}</span>;
  });

  //Render keyboard
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

  //Handles clicks on keyboard
  function handleKeyboardClicks(letter) {
    return setGuessedLetters((prev) => {
      //if array doesn't include the clicked letter
      //return existing array + letter
      //otherwise return the array
      return prev.includes(letter) ? [...prev] : [...prev, letter];
    });
  }

  console.log(guessedLetters);

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
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageChipsEl}</section>
      <section className="word-tiles">{tiles}</section>
      <section className="keyboard">{keyboardEl}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;
