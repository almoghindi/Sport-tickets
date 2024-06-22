import React from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4 w-full md:w-auto">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 w-full md:w-auto">
        <label htmlFor="minPrice" className="text-white mb-2 md:mb-0 md:mr-2">
          Min Price:
        </label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          min={0}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto md:ml-4">
        <label htmlFor="maxPrice" className="text-white mb-2 md:mb-0 md:mr-2">
          Max Price:
        </label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice === 0 ? "" : maxPrice}
          min={0}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
