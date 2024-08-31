"use client";

import { usePetStore } from "@/store/pet-store";
import Image from "next/image";
import PetDetailsButtons from "./pet-details-buttons";

function PetDetails() {
  const selectedPet = usePetStore((state) => state.selectedPet());

  if (!selectedPet) {
    return (
      <div className="h-full w-full flex justify-center items-center font-semibold">
        No pet selected.
      </div>
    );
  }

  return (
    <section className="h-full flex flex-col">
      <div className="flex flex-wrap justify-center md:justify-between gap-y-6 items-center bg-white border-b border-shy p-5">
        <div className="flex gap-x-4 items-center">
          <Image
            src={selectedPet.imageURL}
            alt="pet-image"
            height={55}
            width={55}
            className="h-[65px] w-[65px] rounded-full object-cover"
          />
          <p>{selectedPet.name}</p>
        </div>
        <PetDetailsButtons />
      </div>

      <div className="flex justify-around items-center py-5 text-sm leading-7">
        <div className="text-center">
          <h1>OWNER NAME</h1>
          <p>{selectedPet.ownerName}</p>
        </div>
        <div className="text-center">
          <h1>AGE</h1>
          <p>4</p>
        </div>
      </div>

      <div className="bg-white/80 h-full mx-4 mb-4 p-5 text-sm flex-1 text-black/80 rounded-md shadow-sm min-h-24">
        {selectedPet.notes}
      </div>
    </section>
  );
}

export default PetDetails;
