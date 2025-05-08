import React from 'react';

const StocksWindow = ({ player, updatePlayer, onClose }) => {
  const stocks = [
    { id: 1, name: 'Tech Stock', cost: 3000, dividend: 100, image: '/images/tech_stock.png' },
    { id: 2, name: 'Energy Stock', cost: 50000, dividend: 300, image: '/images/energy_stock.png' },
    { id: 3, name: 'Finance Stock', cost: 70000, dividend: 500, image: '/images/finance_stock.png' },
  ];

  const buyStock = (stock) => {
    const currentMoney = parseFloat(player.money);
    const stockCost = parseFloat(stock.cost);

    if (currentMoney >= stockCost) {
      updatePlayer({
        money: currentMoney - stockCost,
        stocks: [...player.stocks, stock],
        salary: player.salary + stock.dividend, // Увеличиваем зарплату
      });
    } else {
      alert('Not enough money to buy this stock!');
    }
  };

  const sellStock = (stock) => {
    updatePlayer({
      money: parseFloat(player.money) + parseFloat(stock.cost) * 0.8,
      stocks: player.stocks.filter((ownedStock) => ownedStock.id !== stock.id),
      salary: player.salary - stock.dividend, // Уменьшаем зарплату
    });
  };

  return (
    <div className="stocks-window modal">
      <h2>Stocks</h2>

      {/* Доступные акции */}
      <h3>Available Stocks</h3>
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <img src={stock.image} alt={stock.name} />
            <div className="stock-info">
              <h3>{stock.name}</h3>
              <p>Cost: ${stock.cost}, Dividend: ${stock.dividend}</p>
            </div>
            <button onClick={() => buyStock(stock)}>Buy</button>
          </div>
        ))}
      </div>

      {/* Купленные акции */}
      <h3>Your Stocks</h3>
      <div className="owned-stocks-container">
        {player.stocks.length > 0 ? (
          player.stocks.map((stock) => (
            <div key={stock.id} className="owned-stock">
              <img src={stock.image} alt={stock.name} />
              <p>{stock.name}</p>
              <button onClick={() => sellStock(stock)}>Sell</button>
            </div>
          ))
        ) : (
          <p>You don't own any stocks yet.</p>
        )}
      </div>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default StocksWindow;