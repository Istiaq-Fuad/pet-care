import addPet from "@/app/app/actions/add-pet";
import checkoutPet from "@/app/app/actions/checkout-pet";
import editPet from "@/app/app/actions/edit-pet";
import { toast } from "sonner";
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
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (newPet: Omit<Pet, "id">, petId: string) => void;
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

  handleCheckout: async () => {
    const { setPets, pets } = get();
    const selectedPetId = get().selectedPetId;

    if (!selectedPetId) {
      return;
    }

    // optimistically update the state
    const newPets = pets.filter((pet) => pet.id !== selectedPetId);
    setPets(newPets);
    set({ selectedPetId: null });

    // update the database
    const error = await checkoutPet(selectedPetId);

    // revert the state update if any error occurs
    if (error) {
      toast.error(error.message);
      setPets(pets);
    }
  },

  handleAddPet: async (newPet: Omit<Pet, "id">) => {
    const { setPets, pets } = get();
    const newPetWithId = { ...newPet, id: Date.now().toString() };

    setPets([...pets, newPetWithId]);

    const error = await addPet(newPet);

    if (error) {
      toast.error(error.message);
      setPets(pets);
    }
  },

  handleEditPet: async (newPet: Omit<Pet, "id">, petId: string) => {
    const { setPets, pets } = get();

    const newPets = pets.map((pet) => {
      if (pet.id === petId) {
        return { ...pet, ...newPet };
      }
      return pet;
    });

    setPets(newPets);

    const error = await editPet(newPet, petId);

    if (error) {
      toast.error(error.message);
      setPets(pets);
    }
  },
}));
