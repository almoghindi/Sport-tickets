"use client";
import LoadingSpinner from "@/app/components/loading-spinner";
import useRequest from "@/hooks/use-request";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderComplete({
  orderId,
  sessionId,
}: {
  orderId: string;
  sessionId: string;
}) {
  const { sendRequest, isLoading, requestErrors } = useRequest();
  useEffect(() => {
    const handleRequest = async () => {
      await sendRequest({
        url: "/api/payments",
        method: "post",
        body: {
          sessionId,
          orderId,
        },
      });
    };
    handleRequest();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-700 text-white">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold mb-4">
        Order{" "}
        {requestErrors && requestErrors.length > 0 ? "Failed" : "Completed"}
      </h1>
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        href="/"
      >
        Back To Main Page
      </Link>
    </div>
  );
}
