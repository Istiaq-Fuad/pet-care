"use client";

import { usePetStore } from "@/store/pet-store";

function DashboardHeader() {
  const petCount = usePetStore((state) => state.petCount());
  return (
    <section className="flex justify-between items-center leading-4 text-white text-sm">
      <div className="">
        <h1 className="font-bold text-xl">PetSoft</h1>
        <p className="text-white/75">Manage your pet daycare with ease</p>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-xl">{petCount}</h1>
        <p className="text-white/75">current guests</p>
      </div>
    </section>
  );
}

export default DashboardHeader;
