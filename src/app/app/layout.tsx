import PetStoreInitializer from "@/store/pet-store-initializer";
import AppFooter from "./components/app-footer";
import AppHeader from "./components/app-header";
import BackgroundPattern from "./components/background-pattern";

async function Layout({ children }: { children: React.ReactNode }) {
  const response = await fetch("http://localhost:8000/pets");

  const petData = await response.json();

  return (
    <>
      <BackgroundPattern />
      <PetStoreInitializer data={petData} />
      <div className="flex flex-col max-w-[1050px] mx-auto px-5 min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}

export default Layout;
