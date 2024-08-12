import PetStoreInitializer from "@/store/pet-store-initializer";
import AppFooter from "./components/app-footer";
import AppHeader from "./components/app-header";
import BackgroundPattern from "./components/background-pattern";
import { Fragment } from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const response = await fetch("http://localhost:8000/pets");

  const petData = await response.json();

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
    </div>
  );
}

export default Layout;
