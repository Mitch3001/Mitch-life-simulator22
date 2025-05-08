import React from 'react';

const RealEstateWindow = ({ player, updatePlayer, onClose }) => {
  const properties = [
    { id: 1, name: 'Apartment', cost: 50000, income: 200, image: '/images/apartment.png' },
    { id: 2, name: 'House', cost: 100000, income: 500, image: '/images/house.png' },
    { id: 3, name: 'Mansion', cost: 500000, income: 1000, image: '/images/mansion.png' },
  ];

  const buyProperty = (property) => {
    const currentMoney = parseFloat(player.money);
    const propertyCost = parseFloat(property.cost);

    if (currentMoney >= propertyCost) {
      updatePlayer({
        money: currentMoney - propertyCost,
        realEstate: [...player.realEstate, property],
        salary: player.salary + property.income, // Увеличиваем зарплату
      });
    } else {
      alert('Not enough money to buy this property!');
    }
  };

  const sellProperty = (property) => {
    updatePlayer({
      money: parseFloat(player.money) + parseFloat(property.cost) * 0.8,
      realEstate: player.realEstate.filter((ownedProperty) => ownedProperty.id !== property.id),
      salary: player.salary - property.income, // Уменьшаем зарплату
    });
  };

  return (
    <div className="real-estate-window modal">
      <h2>Real Estate</h2>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.name} />
            <p>{property.name}</p>
            <p>Cost: ${property.cost}, Income: ${property.income}</p>
            <button onClick={() => buyProperty(property)}>Buy</button>
          </div>
        ))}
      </div>
      <h3>Your Properties:</h3>
      <div className="owned-properties">
        {player.realEstate.length > 0 ? (
          player.realEstate.map((property) => (
            <div key={property.id} className="owned-property">
              <img src={property.image} alt={property.name} />
              <p>{property.name}</p>
              <button onClick={() => sellProperty(property)}>Sell</button>
            </div>
          ))
        ) : (
          <p>You don't own any properties yet.</p>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RealEstateWindow;