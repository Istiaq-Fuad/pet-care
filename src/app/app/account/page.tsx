import auth from "@/middleware";
import ContentBlock from "../components/content-block";

async function Account() {
  const session = await auth();

  if (!session?.user) {
    return <div>You are not logged in</div>;
  }

  return <div>logged in as {session.user.email}</div>;
}

export default Account;
