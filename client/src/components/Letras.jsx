import React, { useEffect, useState } from "react";

const AnimatedWord = ({ word }) => {
  const [revealedLetters, setRevealedLetters] = useState("");

  useEffect(() => {
    const revealLetters = () => {
      for (let i = 0; i <= word.length; i++) {
        setTimeout(() => {
          setRevealedLetters(word.slice(0, i));
        }, i * 500);
      }
    };

    revealLetters();
  }, [word]);

  return <div className="animated-word">{revealedLetters}</div>;
};

export default AnimatedWord;
