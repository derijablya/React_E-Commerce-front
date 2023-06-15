import React, { useState } from 'react';
import './Panel.css';
import ProductCRUD from './ProductCRUD';

const Panel = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const renderComponent = () => {
        switch (activeItem) {
            case 'products':
                return <ProductCRUD />;
            // Add more cases for other components
            default:
                return null;
        }
    };

    return (
        <div className="panel">
            <div className="panel-items">
                <button
                    className={`panel-item ${activeItem === 'products' ? 'active' : ''}`}
                    onClick={() => handleItemClick('products')}
                >
                    Products
                </button>
                <button
                    className={`panel-item ${activeItem === 'asdasd' ? 'active' : ''}`}
                    onClick={() => handleItemClick('asdasd')}
                >
                    adasd
                </button>
                {/* Add more buttons for other components */}
            </div>
            <div className="panel-content">{renderComponent()}</div>
        </div>
    );
};

export default Panel;
