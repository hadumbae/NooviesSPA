import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PersonProfileImageFormSchema} from "@/pages/persons/schema/forms/PersonForm.schema.ts";
import {PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";

export default function usePersonProfileImageSubmitForm() {
    const defaultValues: PersonProfileImageFormValues = {profileImage: ""};

    return useForm<PersonProfileImageFormValues>({
        resolver: zodResolver(PersonProfileImageFormSchema),
        defaultValues,
    });
}