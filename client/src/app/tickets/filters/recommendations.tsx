import React from "react";
import { MdAutoAwesome } from "react-icons/md";

interface RecommendationsFilterProps {
  onGetRecommendations: () => void;
}

const RecommendationsFilter: React.FC<RecommendationsFilterProps> = ({
  onGetRecommendations,
}) => {
  return (
    <div className="flex items-center mb-4 w-full">
      <button
        onClick={onGetRecommendations}
        className="flex items-center p-2 rounded bg-gray-700 text-white w-full md:w-auto"
      >
        Get Recommendations (Using AI
        <MdAutoAwesome size={20} className="ml-1 text-white" /> )
      </button>
    </div>
  );
};
export default RecommendationsFilter;
