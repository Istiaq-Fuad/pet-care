"use client";

import { useRef } from "react";
import { usePetStore } from "./pet-store";

export default function PetStoreInitializer({ data }: { data: any }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    usePetStore.getState().setPets(data);
    initialized.current = true;
  }
  return null;
}
