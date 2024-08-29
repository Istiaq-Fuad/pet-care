import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logIn from "../actions/login";

function AuthForm({ formType }: { formType: "login" | "signup" }) {
  return (
    <form action={logIn} className="space-y-4">
      <div className="space-y-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </div>
      </div>

      <div>
        <Button type="submit">
          {formType === "login" ? "Log in" : "Sign up"}
        </Button>
      </div>
    </form>
  );
}

export default AuthForm;
