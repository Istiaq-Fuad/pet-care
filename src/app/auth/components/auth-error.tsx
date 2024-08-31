function AuthErrorMessage({ message }: { message: string }) {
  return <p className="text-red-500 text-sm mt-2">{message}</p>;
}

export default AuthErrorMessage;
