import React, { useEffect } from 'react';

const categories = [
  {
    id: 1,
    name: 'Pastry',
  },
  {
    id: 2,
    name: 'Bread',
  },
  {
    id: 3,
    name: 'Cake',
  },
 
];

const prices = [
  {
    id: 1,
    name: 'Less than 2',
    value: 'lt2',
  },
  {
    id: 2,
    name: 'From 2 to 4',
    value: 'btw24',
  },
  {
    id: 3,
    name: 'Greater than 4',
    value: 'gt4',
  },
  {
    id: 4,
    name: 'Clear Filters',
    value: 'clear',
  },
];

const Filters = ({
  activeCategory,
  setActiveCategory,
  activePrice,
  setActivePrice,
  products,
  setFilters,
}) => {
  useEffect(() => {
    if (activeCategory === 'All' && activePrice === '') {
      setFilters(products);
      return;
    }

    const filterCategory = products.filter((item) =>
      activeCategory === 'All' ? item : item.category === activeCategory
    );

    const filterPrice = filterCategory.filter((item) =>
      activePrice === ''
        ? item
        : activePrice === 'lt2'
        ? item.price < 2
        : activePrice === 'btw24'
        ? item.price >= 2 && item.price <= 4
        : item.price > 4
    );

    setFilters(filterPrice);
  }, [activeCategory, activePrice, products, setFilters]);
  return (
    <div>
      <div>
        {categories.map((item) => (
          <button
            onClick={() => setActiveCategory(item.name)}
            key={item.id}
            className={`bg-white border-2 border-gray-500 rounded-lg px-4 py-2 mr-2 mb-2 ${
              activeCategory === item.name && 'bg-blue-500 text-white font-bold'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div>
        {prices.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              item.value !== 'clear'
                ? setActivePrice(item.value)
                : setActivePrice('')
            }
            className={`bg-white border-2 border-gray-500 rounded-lg px-4 py-2 mr-2 mb-2 ${
              activePrice === item.value && 'bg-lime-500 text-white font-bold'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;