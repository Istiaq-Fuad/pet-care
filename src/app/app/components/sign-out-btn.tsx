"use client";

import { Button } from "@/components/ui/button";
import logOut from "../account/actions/signOut";

function SignOutButton() {
  return <Button onClick={() => logOut()}>Sign out</Button>;
}

export default SignOutButton;
