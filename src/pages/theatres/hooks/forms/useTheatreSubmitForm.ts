import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TheatreFormSchema} from "@/pages/theatres/schema/forms/TheatreForm.schema.ts";

import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";


export default function useTheatreSubmitForm(params?: {theatre?: TheatreDetails}) {
    const {theatre = {}} = params || {};

    const defaultValues: TheatreForm = {
        name: "",
        location: "",
        seatCapacity: "",
    }

    return useForm<TheatreForm>({
        resolver: zodResolver(TheatreFormSchema),
        defaultValues: {...defaultValues, ...theatre},
    });
}