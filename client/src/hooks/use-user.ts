"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentUser } from "../store/slices/user-slice";
import { User } from "@/types/user";

export const useUser = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const setCurrentUserHandler = (user: User["currentUser"]) => {
    dispatch(setCurrentUser(user));
  };

  return { currentUser, setCurrentUser: setCurrentUserHandler };
};
