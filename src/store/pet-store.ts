import { create } from "zustand";

type PetStore = {
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  selectedPetId: string | null;
  setSelectedPetId: (petId: string) => void;
  selectedPet: () => Pet | undefined;
  petCount: () => number;
};

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  setPets: (pets: Pet[]) => set({ pets }),
  selectedPetId: null,
  setSelectedPetId: (petId: string) => set({ selectedPetId: petId }),
  selectedPet: () => {
    const state = get();
    return state.pets.find((pet) => pet.id === state.selectedPetId);
  },
  petCount: () => get().pets.length,
}));
