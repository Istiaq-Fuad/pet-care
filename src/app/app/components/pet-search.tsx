"use client";

import { usePetStore } from "@/store/pet-store";

function PetSearch() {
  const { searchQuery, setSearchQuery } = usePetStore();

  return (
    <form className="w-full h-full row-start-1 row-span-1 col-start-1 col-span-1">
      <input
        value={searchQuery}
        placeholder="Search pet"
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="w-full h-full rounded-md bg-white/20 outline-none p-3 text-sm placeholder:text-white/50"

      />
    </form>
  );
}

export default PetSearch;
