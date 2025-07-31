import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreFormSchema} from "@/pages/genres/schema/form/GenreForm.schema.ts";
import {GenreForm} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

export default function useGenreSubmitForm(param?: {genre?: Genre}) {
    const {genre = {}} = param || {};
    const defaultValues = {name: "", description: ""};

    return useForm<GenreForm>({
        resolver: zodResolver(GenreFormSchema),
        defaultValues: {...defaultValues, ...genre},
    });
}