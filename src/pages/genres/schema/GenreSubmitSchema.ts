import {z, type ZodType} from 'zod';
import IGenreSubmit from "@/pages/genres/schema/interface/IGenreSubmit.ts";
import {RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";

export const GenreSubmitSchema: ZodType<IGenreSubmit> = z.object({
    name: RequiredString
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: RequiredString
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),
});

export type GenreSubmit = z.infer<typeof GenreSubmitSchema>;