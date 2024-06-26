import React from "react";
import DateFilter from "./date";
import PriceFilter from "./price";
import SportFilter from "./sport";
import TitleFilter from "./title";
import RecommendationsFilter from "./recommendations";
import { SportFilterOptions } from "@/types/sport-categories";

interface FiltersProps {
  filters: {
    title: string;
    minPrice: number;
    maxPrice: number;
    date: string;
    sport: SportFilterOptions;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      title: string;
      minPrice: number;
      maxPrice: number;
      date: string;
      sport: SportFilterOptions;
    }>
  >;
  onGetRecommendations: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  onGetRecommendations,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-white text-xl font-bold">Filters</h2>
      <TitleFilter
        title={filters.title}
        setTitle={(title) => setFilters((prev) => ({ ...prev, title }))}
      />
      <PriceFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        setMinPrice={(minPrice) =>
          setFilters((prev) => ({ ...prev, minPrice }))
        }
        setMaxPrice={(maxPrice) =>
          setFilters((prev) => ({ ...prev, maxPrice }))
        }
      />
      <DateFilter
        date={filters.date}
        setDate={(date) => setFilters((prev) => ({ ...prev, date }))}
      />
      <SportFilter
        sport={filters.sport}
        setSport={(sport) => setFilters((prev) => ({ ...prev, sport }))}
      />
      <RecommendationsFilter onGetRecommendations={onGetRecommendations} />
    </div>
  );
};

export default Filters;
