import {useForm} from "react-hook-form";
import {PersonSubmit, PersonSubmitSchema} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";

export default function usePersonSubmitForm(params?: {person?: Person}) {
    const {person} = params || {};

    const defaultValues = {
        name: "",
        biography: "",
        dob: undefined,
        nationality: undefined,
    };

    return useForm<PersonSubmit>({
        resolver: zodResolver(PersonSubmitSchema),
        defaultValues: {...defaultValues, ...person},
    })
}