import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import PetDialog from "./pet-dialog";

function PetListButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PetDialog formAction="add" formText="Add a new pet">
      <Button size="icon" className="absolute bottom-4 right-4">
        <PlusIcon />
      </Button>
    </PetDialog>
  );
}

export default PetListButton;
