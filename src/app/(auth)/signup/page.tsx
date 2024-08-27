import AuthFooter from "../components/auth-footer";
import AuthForm from "../components/auth-form";
import AuthHeader from "../components/auth-header";

function SignUp() {
  return (
    <div>
      <AuthHeader formHeader="Sign Up" />

      <AuthForm buttonText="Sign up" />
      <AuthFooter
        href="/login"
        footerText="Already have an account?"
        linkText="Login"
      />
    </div>
  );
}

export default SignUp;
