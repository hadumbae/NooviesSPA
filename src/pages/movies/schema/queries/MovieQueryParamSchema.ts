import {z} from 'zod';
import {IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";

export const MovieQueryParamSchema = z.object({
    title: TrimmedStringSchema.optional(),
    releaseDate: DateStringSchema.optional(),
    genres: z.array(IDString).optional(),
});

export type MovieQueryParams = z.infer<typeof MovieQueryParamSchema>;