import Logo from "@/components/logo";

function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Logo />
      {children}
    </div>
  );
}

export default AuthPageLayout;
