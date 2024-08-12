"use client";

import { cn } from "@/lib/utils";
import { usePetStore } from "@/store/pet-store";
import Image from "next/image";

function PetList() {
  const { pets, selectedPetId, setSelectedPetId } = usePetStore();
  // const selectedPetId = usePetStore((state) => state.selectedPetId);
  // const setSelectedPetId = usePetStore((state) => state.setSelectedPetId);

  return (
    <div className="h-full w-full">
      <ul>
        {pets &&
          pets.map((pet) => (
            <li
              key={pet.id}
              className={cn("p-4 border-b border-white/40", {
                "bg-black/10": selectedPetId === pet.id,
              })}
            >
              <button
                className="flex items-center gap-3 h-full w-full"
                onClick={() => setSelectedPetId(pet.id)}
              >
                <Image
                  src={pet.imageUrl}
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
    </div>
  );
}

export default PetList;
