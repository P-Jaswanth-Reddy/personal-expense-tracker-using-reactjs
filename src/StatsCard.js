import React from 'react';

const StatsCard = ({ title, amount, type }) => {
  const formatAmount = (amount) => {
    if (type === 'categories') {
      return amount.toString();
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className={`stats-card stats-card-${type}`}>
      <div className="stats-card-header">
        <h3>{title}</h3>
      </div>
      <div className="stats-card-amount">
        {formatAmount(amount)}
      </div>
    </div>
  );
};

export default StatsCard;