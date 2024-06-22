"use client";
import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loading-spinner";
import { useUser } from "@/hooks/use-user";

export default function Signout() {
  const { sendRequest } = useRequest();
  const Router = useRouter();
  const { setCurrentUser } = useUser();

  const sendRequestHandler = async () =>
    await sendRequest({
      url: "/api/users/signout",
      method: "post",
      body: {},
      onSuccess: () => {
        Router.push("/");
        setCurrentUser(null);
      },
    });
  useEffect(() => {
    console.log("signout");
    sendRequestHandler();
  }, []);

  return <LoadingSpinner />;
}
