import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreSubmit, TheatreSubmitSchema} from "@/pages/theatres/schema/TheatreSubmitSchema.ts";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";


export default function useTheatreSubmitForm(params?: {theatre?: Theatre}) {
    const {theatre = {}} = params || {};

    const defaultValues: TheatreSubmit = {
        name: "",
        location: "",
        seatCapacity: "",
    }

    return useForm<TheatreSubmit>({
        resolver: zodResolver(TheatreSubmitSchema),
        defaultValues: {...defaultValues, ...theatre},
    });
}