import React from 'react';

const CareerWindow = ({ player, updatePlayer, onClose }) => {
  const handlePromote = () => {
    const promotionCost = player.salary * 2; // Стоимость повышения
    if (player.money >= promotionCost) {
      updatePlayer({
        money: player.money - promotionCost,
        jobLevel: player.jobLevel + 1,
        salary: player.salary * 1.2, // Увеличиваем зарплату на 20%
      });
    } else {
      alert('Not enough money to promote!');
    }
  };

  return (
    <div className="career-window modal">
      <h2>Career</h2>
      <p>Job Level: {player.jobLevel}</p>
      <p>Salary: ${player.salary.toFixed(2)}</p>
      <button onClick={handlePromote}>Promote</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CareerWindow;