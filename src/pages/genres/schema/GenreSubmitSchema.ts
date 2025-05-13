import {z, type ZodType} from 'zod';
import IGenreSubmit from "@/pages/genres/schema/interface/IGenreSubmit.ts";

import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";

export const GenreSubmitSchema: ZodType<IGenreSubmit> = z.object({
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: NonEmptyStringSchema
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),
});

export type GenreSubmit = z.infer<typeof GenreSubmitSchema>;