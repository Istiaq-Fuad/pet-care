"use client";

import { useRef } from "react";
import { usePetStore } from "./pet-store";

export default function PetStoreInitializer({ data }: { data: any }) {
  usePetStore.getState().setPets(data);
  return null;
}
