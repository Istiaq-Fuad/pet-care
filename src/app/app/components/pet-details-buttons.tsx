import { Button } from "@/components/ui/button";
import { usePetStore } from "@/store/pet-store";

function PetDetailsButtons() {
  const {handleCheckout} = usePetStore();

  return (
    <div className="flex gap-x-3 items-center">
      <Button variant="secondary">Edit</Button>
      <Button variant="secondary" onClick={handleCheckout}>Checkout</Button>
    </div>
  );
}

export default PetDetailsButtons;
