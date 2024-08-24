import PetStoreInitializer from "@/store/pet-store-initializer";
import AppFooter from "./components/app-footer";
import AppHeader from "./components/app-header";
import BackgroundPattern from "./components/background-pattern";
import { Fragment } from "react";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";

async function Layout({ children }: { children: React.ReactNode }) {
  const petData = await prisma.pet.findMany();

  return (
    <div className="bg-slate-100">
      <div>
        <BackgroundPattern />
        <PetStoreInitializer data={petData} />
        <div className="flex flex-col max-w-[1050px] mx-auto px-5 min-h-screen relative z-50">
          <AppHeader />
          {children}
          <AppFooter />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Layout;
