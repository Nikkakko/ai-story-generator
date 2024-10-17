"use client";

import * as React from "react";
import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/(login)/_actions";
import { Button } from "./ui/button";

interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = ({}) => {
  const { setUser } = useUser();
  const router = useRouter();
  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }
  return (
    <Button onClick={handleSignOut} type="button" className="bg-violet-600">
      Sign Out
    </Button>
  );
};

export default SignOut;
