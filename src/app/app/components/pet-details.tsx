"use client";

import { usePetStore } from "@/store/pet-store";

function PetDetails() {
  const selectedPet = usePetStore((state) => state.selectedPet());
  const petCount = usePetStore((state) => state.petCount());
  // console.log(petCount);
  return (
    <div>
      {selectedPet?.name} {petCount}
    </div>
  );
}

export default PetDetails;
