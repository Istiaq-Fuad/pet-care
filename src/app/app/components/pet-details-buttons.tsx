import { Button } from "@/components/ui/button";
import { usePetStore } from "@/store/pet-store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetDialog from "./pet-dialog";

function PetDetailsButtons() {
  const { handleCheckout } = usePetStore();

  return (
    <div className="flex gap-x-3 items-center">
      <PetDialog formAction="edit" formText="Edit pet">
        <Button variant="secondary">Edit</Button>
      </PetDialog>

      <Button variant="secondary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
}

export default PetDetailsButtons;
