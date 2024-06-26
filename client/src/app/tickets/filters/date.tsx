import React from "react";

interface DateFilterProps {
  date: string;
  setDate: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ date, setDate }) => {
  return (
    <div className="flex items-center mb-4 w-full">
      <label htmlFor="date" className="text-white w-1/4">
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded bg-gray-700 border border-gray-500 text-white w-3/4"
      />
    </div>
  );
};

export default DateFilter;
