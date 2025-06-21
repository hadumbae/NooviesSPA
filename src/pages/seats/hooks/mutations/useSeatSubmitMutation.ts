import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {Seat, SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {SeatSubmit} from "@/pages/seats/schema/SeatSubmitSchema.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<SeatSubmit>,
    onSubmit?: (seat: Seat) => void,
}

export default function useSeatSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = SeatRepository;
    const entityName = "Seat";
    const mutationKey = ['submit_seat_data'];
    const schema = SeatSchema;

    return mutationFormSubmitHandler<Seat, typeof schema, SeatSubmit>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}