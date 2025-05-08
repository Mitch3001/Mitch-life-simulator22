import React, { useState, useEffect } from 'react';
import CareerWindow from './components/CareerWindow';
import RealEstateWindow from './components/RealEstateWindow';
import StocksWindow from './components/StocksWindow';
import CarsWindow from './components/CarsWindow';
import CharacterDialog from './components/CharacterDialog';

function App() {
  // Состояние игрока
  const [player, setPlayer] = useState({
    name: 'Mitch',
    money: 1000,
    salary: 500,
    jobLevel: 1,
    realEstate: [],
    stocks: [],
    cars: [],
  });

  // Состояние модальных окон
  const [showCareer, setShowCareer] = useState(false);
  const [showRealEstate, setShowRealEstate] = useState(false);
  const [showStocks, setShowStocks] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Функция обновления состояния игрока
  const updatePlayer = (updates) => {
    setPlayer((prevPlayer) => {
      const updatedPlayer = { ...prevPlayer, ...updates };
      console.log('Updated Player State:', updatedPlayer); // Отладка
      return updatedPlayer;
    });
  };

  // Функция добавления денег
  const addMoney = () => {
    updatePlayer({ money: player.money + 25 }); // Увеличиваем баланс на 10
  };

  // Автоматическое начисление денег каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      let income = player.salary;

      player.realEstate.forEach((property) => {
        income += property.income;
      });

      player.stocks.forEach((stock) => {
        income += stock.dividend;
      });

      player.cars.forEach((car) => {
        income -= car.maintenance;
      });

      updatePlayer({ money: player.money + income });
    }, 2000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [player]);

  // Функция закрытия модального окна с анимацией
  const closeWithAnimation = (setState) => {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('fade-out');
      setTimeout(() => {
        setState(false);
      }, 500); // Время анимации (0.5 секунды)
    }
  };

  return (
    <div className="App">
      <h1>Mitch's Life Simulator</h1>
      <p>Money: ${player.money.toFixed(2)}</p>
      <p>Salary: ${player.salary.toFixed(2)}</p>

      {/* Кнопки */}
      <div className="buttons">
        <button onClick={() => setShowCareer(true)}>Career</button>
        <button onClick={() => setShowRealEstate(true)}>Real Estate</button>
        <button onClick={() => setShowStocks(true)}>Stocks</button>
        <button onClick={() => setShowCars(true)}>Cars</button>
        <button onClick={() => setShowDialog(true)}>Meet Characters</button>
      </div>

      {/* Большая кнопка Add $25 */}
      <div className="add-money-container">
        <button className="add-money-button" onClick={addMoney}>
          Add $25
        </button>
      </div>

      {/* Модальные окна */}
      {showCareer && (
        <div className="overlay">
          <div className="modal">
            <CareerWindow player={player} updatePlayer={updatePlayer} onClose={() => closeWithAnimation(setShowCareer)} />
          </div>
        </div>
      )}

      {showRealEstate && (
        <div className="overlay">
          <div className="modal">
            <RealEstateWindow player={player} updatePlayer={updatePlayer} onClose={() => closeWithAnimation(setShowRealEstate)} />
          </div>
        </div>
      )}

      {showStocks && (
        <div className="overlay">
          <div className="modal">
            <StocksWindow player={player} updatePlayer={updatePlayer} onClose={() => closeWithAnimation(setShowStocks)} />
          </div>
        </div>
      )}

      {showCars && (
        <div className="overlay">
          <div className="modal">
            <CarsWindow player={player} updatePlayer={updatePlayer} onClose={() => closeWithAnimation(setShowCars)} />
          </div>
        </div>
      )}

      {showDialog && (
        <div className="overlay">
          <div className="modal">
            <CharacterDialog onClose={() => closeWithAnimation(setShowDialog)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;