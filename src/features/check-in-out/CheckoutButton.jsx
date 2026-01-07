import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingOut} = useCheckout(bookingId);
  function handleCheckout() {
    checkout({ bookingId });
  }
  return (
    <Button variation="primary" size="small" onClick={handleCheckout} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
