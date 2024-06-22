import React from "react";

interface TitleFilterProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleFilter: React.FC<TitleFilterProps> = ({ title, setTitle }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4 w-full md:w-auto">
      <label htmlFor="title" className="text-white mb-2 md:mb-0 md:mr-2">
        Title:
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
      />
    </div>
  );
};

export default TitleFilter;
