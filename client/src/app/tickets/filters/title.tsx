import React from "react";

interface TitleFilterProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleFilter: React.FC<TitleFilterProps> = ({ title, setTitle }) => {
  return (
    <div className="flex items-center mb-4 w-full">
      <label htmlFor="title" className="text-white w-1/4">
        Title:
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded bg-gray-700 border border-gray-500 text-white w-3/4"
      />
    </div>
  );
};

export default TitleFilter;
