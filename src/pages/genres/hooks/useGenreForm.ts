import {useForm} from "react-hook-form";
import {GenreSubmit, GenreSubmitSchema} from "@/pages/genres/schema/GenreSubmitSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";

export default function useGenreForm(param?: {genre?: Genre}) {
    const {genre} = param || {};
    const defaultValues = {name: "", description: ""};

    return useForm<GenreSubmit>({
        resolver: zodResolver(GenreSubmitSchema),
        defaultValues: {...defaultValues, ...genre},
    });
}