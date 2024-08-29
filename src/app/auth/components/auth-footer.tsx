import Link from "next/link";

function AuthFooter({
  footerText,
  href,
  linkText,
}: {
  footerText: string;
  href: string;
  linkText: string;
}) {
  return (
    <p className="my-4 text-black/65 font-medium text-sm">
      {footerText}{" "}
      <Link className="font-semibold text-black/80" href={href}>
        {linkText}
      </Link>
    </p>
  );
}

export default AuthFooter;
