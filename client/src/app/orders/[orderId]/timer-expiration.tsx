"use client";
import { useEffect, useState } from "react";

const TimerExpiration = ({ expirationTime }: { expirationTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(expirationTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft < 1)
    return <div className="text-red-500 font-bold">Order Expired</div>;

  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-blue-500">
        {timeLeft} seconds left
      </div>
    </div>
  );
};

export default TimerExpiration;
