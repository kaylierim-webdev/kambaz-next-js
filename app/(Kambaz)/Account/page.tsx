"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (state: any) => state.accountReducer
  );
  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }
}
