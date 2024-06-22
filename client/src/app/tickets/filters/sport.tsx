import React from "react";
import { SportsCategories, SportFilterOptions } from "@/types/sport-categories";

interface SportFilterProps {
  sport: SportFilterOptions;
  setSport: (sport: SportFilterOptions) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ sport, setSport }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4 w-full md:w-auto">
      <label htmlFor="category" className="text-white mb-2 md:mb-0 md:mr-2">
        Sport:
      </label>
      <select
        id="category"
        value={sport}
        onChange={(e) => setSport(e.target.value as SportFilterOptions)}
        className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
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
