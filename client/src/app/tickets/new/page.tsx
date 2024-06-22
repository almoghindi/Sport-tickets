"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/app/components/text-field";
import Button from "@/app/components/button";
import LoadingSpinner from "@/app/components/loading-spinner";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import { SportsCategories } from "@/types/sport-categories";
import { z } from "zod";
import DropdownField from "@/app/components/dropdown-field";
import { RootState } from "@/store/store";
import { useUser } from "@/hooks/use-user";

const newTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  sport: z.nativeEnum(SportsCategories),
  price: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const num = parseFloat(arg);
      return isNaN(num) ? undefined : parseFloat(num.toFixed(2));
    } else if (typeof arg === "number") {
      return parseFloat(arg.toFixed(2));
    }
    return undefined;
  }, z.number().min(1, "Price must be greater than 0")),
});

type NewTicketSchemaType = z.infer<typeof newTicketSchema>;

const NewTicket: React.FC = () => {
  const currentUser = useUser();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/signup");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTicketSchemaType>({
    resolver: zodResolver(newTicketSchema),
  });

  const { sendRequest, isLoading, requestErrors } = useRequest();
  const router = useRouter();

  const onSubmit: SubmitHandler<NewTicketSchemaType> = async (data) => {
    try {
      await sendRequest({
        url: "/api/tickets",
        method: "POST",
        body: data,
        onSuccess: () => {
          router.push("/");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sportOptions = Object.values(SportsCategories) as string[];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
        <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">New Ticket</h1>{" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
              placeholder="Title"
              type="text"
            />
            <TextField
              {...register("date", { required: "Date is required" })}
              error={errors.date?.message}
              placeholder="Date"
              type="date"
            />
            <DropdownField
              {...register("sport", { required: "Sport is required" })}
              error={errors.sport?.message}
              placeholder="Select Sport"
              options={sportOptions.filter((value) => isNaN(Number(value)))}
            />
            <TextField
              {...register("price", { required: "Price is required" })}
              error={errors.price?.message}
              placeholder="Price"
              type="number"
            />
            <Button text="Submit" type="submit" />
            {requestErrors &&
              requestErrors.map((error) => (
                <div key={error.message} className="text-red-500">
                  {error.message}
                </div>
              ))}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewTicket;
