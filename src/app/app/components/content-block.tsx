import { cn } from "@/lib/utils";
import React from "react";

function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  // className?: React.ComponentProps<"div">["className"];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-md overflow-hidden bg-[#f3f3f3] shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
