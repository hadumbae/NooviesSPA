import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    PersonProfileImageFormValues,
    PersonProfileImageSubmitSchema
} from "@/pages/persons/schema/admin/PersonProfileImageSubmitSchema.ts";

export default function usePersonProfileImageSubmitForm() {
    const defaultValues: PersonProfileImageFormValues = {profileImage: ""};

    return useForm<PersonProfileImageFormValues>({
        resolver: zodResolver(PersonProfileImageSubmitSchema),
        defaultValues,
    });
}