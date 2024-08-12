"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppHeader() {
  const activePathName = usePathname();

  const routes = [
    {
      label: "Dashboard",
      path: "/app/dashboard",
    },
    {
      label: "Account",
      path: "/app/account",
    },
  ];
  return (
    <header className="flex items-center justify-between text-xs py-2 border-b border-white/10">
      <Logo />
      <nav>
        <ul className="flex gap-4">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition",
                  {
                    "bg-black/10 text-white": activePathName === route.path,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
