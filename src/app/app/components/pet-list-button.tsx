import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

function PetListButton() {
  return (
    <Button size="icon" className="absolute bottom-4 right-4">
      <PlusIcon />
    </Button>
  );
}

export default PetListButton;
