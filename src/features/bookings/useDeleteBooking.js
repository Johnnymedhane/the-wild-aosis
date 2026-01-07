import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
"react-router-dom";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {mutate: deleteBooking, isLoading: isDeleting} = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
     
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  return { deleteBooking, isDeleting };
}

export default useDeleteBooking
