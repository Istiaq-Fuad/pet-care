import { auth } from "@/lib/auth-no-edge";
import SignOutButton from "../components/sign-out-btn";

async function Account() {
  const session = await auth();

  if (!session?.user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center">
      <h1>logged in as {session.user.email}</h1>
      <SignOutButton />
    </div>
  );
}

export default Account;
