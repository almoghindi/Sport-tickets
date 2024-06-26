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
    <div className="flex flex-col w-full mb-4">
      <div className="flex items-center mb-4 w-full">
        <label htmlFor="minPrice" className="text-white w-1/4">
          Min Price:
        </label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          min={0}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 border border-gray-500 text-white w-3/4"
        />
      </div>
      <div className="flex items-center w-full mt-4">
        <label htmlFor="maxPrice" className="text-white w-1/4">
          Max Price:
        </label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice === 0 ? "" : maxPrice}
          min={0}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 border border-gray-500 text-white w-3/4"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
