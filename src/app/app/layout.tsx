import PetStoreInitializer from "@/store/pet-store-initializer";
import AppFooter from "./components/app-footer";
import AppHeader from "./components/app-header";
import BackgroundPattern from "./components/background-pattern";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // console.log(session);
  if (!session?.user) {
    redirect("/login");
  }

  const petData = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
