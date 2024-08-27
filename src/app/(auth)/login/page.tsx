import AuthFooter from "../components/auth-footer";
import AuthForm from "../components/auth-form";
import AuthHeader from "../components/auth-header";

function Login() {
  return (
    <div>
      <AuthHeader formHeader="Log In" />
      <AuthForm buttonText="Log in" />
      <AuthFooter
        href="/signup"
        footerText="No account yet?"
        linkText="Sign up"
      />
    </div>
  );
}

export default Login;
