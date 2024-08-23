"use client";

import { cn } from "@/lib/utils";
import { usePetStore } from "@/store/pet-store";
import Image from "next/image";
import PetListButton from "./pet-list-button";

function PetList() {
  const { searchedPet: pets, selectedPetId, setSelectedPetId } = usePetStore();
  // const selectedPetId = usePetStore((state) => state.selectedPetId);
  // const setSelectedPetId = usePetStore((state) => state.setSelectedPetId);

  return (
    <div className="h-full w-full relative">
      <ul className="h-full w-full">
        {pets &&
          pets.map((pet) => (
            <li
              key={pet.id}
              className={cn("border-b border-shy", {
                "bg-black/10": selectedPetId === pet.id,
              })}
            >
              <button
                className="flex items-center gap-x-3 h-full w-full p-4"
                onClick={() => setSelectedPetId(pet.id)}
              >
                <Image
                  src={pet.imageURL}
                  alt="pet-image"
                  height={45}
                  width={45}
                  className="rounded-full h-[45px] w-[45px] object-cover"
                />
                <p>{pet.name}</p>
              </button>
            </li>
          ))}
      </ul>
      <PetListButton />
    </div>
  );
}

export default PetList;
