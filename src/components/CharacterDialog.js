import React from 'react';

const CharacterDialog = ({ onClose }) => {
  const characters = [
    { name: 'Alice', dialogue: 'Want to invest in my startup?', image: '/images/character1.png' },
    { name: 'Bob', dialogue: 'Let me help you with your career!', image: '/images/character2.png' },
  ];

  return (
    <div className="character-dialog modal">
      <h2>Meet Characters</h2>
      <div className="characters-list">
        {characters.map((character, index) => (
          <div key={index} className="character-card">
            <img src={character.image} alt={character.name} />
            <p>{character.dialogue}</p>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CharacterDialog;