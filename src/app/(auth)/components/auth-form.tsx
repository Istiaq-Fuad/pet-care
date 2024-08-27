import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthForm({ buttonText }: { buttonText: string }) {
  return (
      <form action="" className="space-y-4">
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
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>
  );
}

export default AuthForm;
