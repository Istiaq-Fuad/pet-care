import React from "react";
import ContentBlock from "../components/content-block";

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <h1 className="text-white text-xl mb-4 font-bold">Account</h1>

      <section className="h-[65vh]">
        <ContentBlock className="h-full w-full flex items-center justify-center">
          {children}
        </ContentBlock>
      </section>
    </div>
  );
}

export default Layout;
