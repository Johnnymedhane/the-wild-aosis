import { useForm } from "react-hook-form";
import useEditBooking from "./useEditBooking";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import { format, isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../../utils/helpers";
function EditBooking({ booking }) {
  const { editBooking, isEditing } = useEditBooking();

  console.log(booking);
  const editValues = {
    startDate: format(new Date(booking.startDate), "yyyy-MM-dd"),
    endDate: format(new Date(booking.endDate), "yyyy-MM-dd"),
    numGuests: booking.numGuests || 1,
    hasBreakfast: booking.hasBreakfast,
    isPaid: booking.isPaid,
    observations: booking.observations,
  };
  console.log(editValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...editValues },
  });

  // if (isEditing) return <Spinner />;

  function onSubmit(data) {
    const numGuests = Number(data.numGuests);
    const numNights = subtractDates(data.endDate, data.startDate);
    const cabinPrice =
      numNights * (booking.cabins.regularPrice - booking.cabins.discount);
    const extrasPrice = data.hasBreakfast ? numNights * 15 * numGuests : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(data.endDate)) && !isToday(new Date(data.endDate)))
      status = "checked-out";
    if (isFuture(new Date(data.startDate)) || isToday(new Date(data.startDate)))
      status = "unconfirmed";
    if (
      (isFuture(new Date(data.endDate)) || isToday(new Date(data.endDate))) &&
      isPast(new Date(data.startDate)) &&
      !isToday(new Date(data.startDate))
    )
      status = "checked-in";

    console.log("Form Data:", data);
    console.log("Submission Data:", {
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
    });

    editBooking({
      id: booking.id,
      newBookingData: {
        startDate: data.startDate,
        endDate: data.endDate,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        status,
        numGuests,
        hasBreakfast: !!data.hasBreakfast,
        isPaid: !!data.isPaid,
        observations: data.observations || "",
      },
    });
    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="startDate" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isEditing}
          {...register("startDate", { required: "Start date is required" })}
        />
      </FormRow>
      <FormRow label="endDate" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isEditing}
          {...register("endDate", { required: "End date is required" })}
        />
      </FormRow>

      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isEditing}
          {...register("numGuests", {
            required: "Number of guests is required",
            min: { value: 1, message: "At least 1 guest is required" },
          })}
        />
      </FormRow>

      <FormRow label="Has Breakfast" error={errors?.hasBreakfast?.message}>
        <input
          type="checkbox"
          id="hasBreakfast"
          disabled={isEditing}
          {...register("hasBreakfast")}
        />
      </FormRow>
      <FormRow label="Paid" error={errors?.isPaid?.message}>
        <input
          type="checkbox"
          id="isPaid"
          disabled={isEditing}
          {...register("isPaid")}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          id="observations"
          disabled={isEditing}
          {...register("observations")}
        />
      </FormRow>
      <FormRow>
        <Button variation="primary" size="medium" disabled={isEditing}>
          Save changes
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditBooking;
