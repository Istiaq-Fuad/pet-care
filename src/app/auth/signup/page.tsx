import AuthFooter from "../components/auth-footer";
import AuthForm from "../components/auth-form";
import AuthHeader from "../components/auth-header";

function SignUpPage() {
  return (
    <div>
      <AuthHeader formHeader="Sign Up" />

      <AuthForm formType="signup" />
      <AuthFooter
        href="/auth/login"
        footerText="Already have an account?"
        linkText="Login"
      />
    </div>
  );
}

export default SignUpPage;
