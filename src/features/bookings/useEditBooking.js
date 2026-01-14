import { useMutation, useQueryClient} from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { updateBooking} from "../../services/apiBookings";


function useEditBooking() {
  const queryClient = useQueryClient();
  const {mutate: editBooking, isLoading: isEditing} = useMutation({
    mutationFn: ({ id, newBookingData }) => updateBooking(id, newBookingData),
    onSuccess: (_, { id }) => {
      toast.success("Booking successfully edited");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  
  return { editBooking, isEditing };
}

export default useEditBooking
