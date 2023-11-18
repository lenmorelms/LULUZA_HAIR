import React, { useState } from 'react';

const CurrencySelector = () => {
    const [currency, setCurrency] = useState('ZAR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div className="currency-selector">
            <select value={currency} onChange={handleChange}>
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
