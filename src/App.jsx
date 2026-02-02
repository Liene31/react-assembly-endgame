import { useState } from "react";
import { languages } from "../languages.js";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

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
  const wordToGuessArr = currentWord.split("");
  console.log(wordToGuessArr);
  const tiles = wordToGuessArr.map((letter, index) => {
    return <span key={index}>{letter}</span>;
  });

  //Render alphabet
  const alphabetArr = alphabet.split("");
  const alphabetEl = alphabetArr.map((letter) => {
    return <button>{letter}</button>;
  });

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
      <section className="keyboard">{alphabetEl}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;
