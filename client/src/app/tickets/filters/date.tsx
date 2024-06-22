import React from "react";

interface DateFilterProps {
  date: string;
  setDate: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ date, setDate }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4 w-full md:w-auto">
      <label htmlFor="date" className="text-white mb-2 md:mb-0 md:mr-2">
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
      />
    </div>
  );
};

export default DateFilter;
