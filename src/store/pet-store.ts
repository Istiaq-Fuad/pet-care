import { create } from "zustand";

type PetStore = {
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  selectedPetId: string | null;
  setSelectedPetId: (petId: string) => void;
  selectedPet: () => Pet | undefined;
  petCount: () => number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchedPet: Pet[];
  setSearchedPet: () => void;
  handleCheckout: () => void;
};

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  setPets: (pets: Pet[]) => {
    set({ pets });

    const { setSearchedPet } = get();
    setSearchedPet();
  },
  searchQuery: "",
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    const { setSearchedPet } = get();
    setSearchedPet();
  },
  searchedPet: [],
  setSearchedPet: () => {
    const { pets } = get();

    set({
      searchedPet: pets.filter((pet) =>
        pet.name.toLowerCase().includes(get().searchQuery.toLowerCase())
      ),
    });
  },
  selectedPetId: null,
  setSelectedPetId: (petId: string) => set({ selectedPetId: petId }),
  selectedPet: () => {
    const state = get();
    return state.pets.find((pet) => pet.id === state.selectedPetId);
  },
  petCount: () => get().pets.length,
  handleCheckout: () => {
    const { setPets, pets } = get();
    const selectedPet = get().selectedPet();
    if (selectedPet) {
      const newPets = pets.filter((pet) => pet.id !== selectedPet.id);
      setPets(newPets);
      set({ selectedPetId: null });
    }
  },
}));
