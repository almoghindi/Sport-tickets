"use client";
import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loading-spinner";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/slices/user-slice";

export default function Signout() {
  const { sendRequest } = useRequest();
  const Router = useRouter();
  const dispatch = useDispatch();

  const sendRequestHandler = () =>
    sendRequest({
      url: "/api/users/signout",
      method: "post",
      body: {},
      onSuccess: () => {
        Router.push("/");
        dispatch(setCurrentUser(null));
      },
    });
  useEffect(() => {
    console.log("signout");
    sendRequestHandler();
  }, []);

  return <LoadingSpinner />;
}
