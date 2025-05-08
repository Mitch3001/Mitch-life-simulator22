import React from 'react';

const CarsWindow = ({ player, updatePlayer, onClose }) => {
  const cars = [
    { id: 1, name: 'Toyota', cost: 50000, maintenance: 1000, image: '/images/toyota.png' },
    { id: 2, name: 'BMW', cost: 1000000, maintenance: 2000, image: '/images/bmw.png' },
    { id: 3, name: 'Ferrari', cost: 200000000, maintenance: 500000, image: '/images/ferrari.png' },
  ];

  const buyCar = (car) => {
    const currentMoney = parseFloat(player.money);
    const carCost = parseFloat(car.cost);

    if (currentMoney >= carCost) {
      updatePlayer({
        money: currentMoney - carCost,
        cars: [...player.cars, car],
        salary: player.salary - car.maintenance, // Уменьшаем зарплату
      });
    } else {
      alert('Not enough money to buy this car!');
    }
  };

  const sellCar = (car) => {
    updatePlayer({
      money: parseFloat(player.money) + parseFloat(car.cost) * 0.8,
      cars: player.cars.filter((ownedCar) => ownedCar.id !== car.id),
      salary: player.salary + car.maintenance, // Увеличиваем зарплату
    });
  };

  return (
    <div className="cars-window modal">
      <h2>Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} />
            <p>{car.name}</p>
            <p>Cost: ${car.cost}, Maintenance: ${car.maintenance}</p>
            <button onClick={() => buyCar(car)}>Buy</button>
          </div>
        ))}
      </div>
      <h3>Your Cars:</h3>
      <div className="owned-cars">
        {player.cars.length > 0 ? (
          player.cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <p>{car.name}</p>
              <button onClick={() => sellCar(car)}>Sell</button>
            </div>
          ))
        ) : (
          <p>You don't own any cars yet.</p>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CarsWindow;