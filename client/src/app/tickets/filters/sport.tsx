import React from "react";
import { SportsCategories, SportFilterOptions } from "@/types/sport-categories";

interface SportFilterProps {
  sport: SportFilterOptions;
  setSport: (sport: SportFilterOptions) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ sport, setSport }) => {
  return (
    <div className="flex items-center mb-4 w-full">
      <label htmlFor="category" className="text-white w-1/4">
        Sport:
      </label>
      <select
        id="category"
        value={sport}
        onChange={(e) => setSport(e.target.value as SportFilterOptions)}
        className="p-2 rounded bg-gray-700 border border-gray-500 text-white w-3/4"
      >
        <option value="All">All</option>
        {Object.values(SportsCategories).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportFilter;
