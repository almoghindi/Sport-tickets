"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/app/components/text-field";
import Button from "@/app/components/button";
import LoadingSpinner from "@/app/components/loading-spinner";
import useRequest from "@/hooks/use-request";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

const SignupSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters long" }),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

const SignupPage: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });
  const { sendRequest, isLoading, requestErrors } = useRequest();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
    try {
      await sendRequest({
        url: "/api/users/signup",
        method: "POST",
        body: data,
        onSuccess: (userData) => {
          setCurrentUser(userData);
          router.push("/");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
        <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>{" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
              placeholder="Email"
              type="email"
            />
            <TextField
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
              placeholder="Password"
              type="password"
            />
            <Button text="Submit" type="submit" />
            {requestErrors &&
              requestErrors.map((error) => (
                <div key={error.message} className="text-red-500">
                  {error.message}
                </div>
              ))}
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
