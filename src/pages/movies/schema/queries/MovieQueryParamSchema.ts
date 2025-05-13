import {z} from 'zod';
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const MovieQueryParamSchema = z.object({
    title: NonEmptyStringSchema.optional(),
    releaseDate: DateStringSchema.optional(),
    genres: z.array(IDStringSchema).optional(),
});

export type MovieQueryParams = z.infer<typeof MovieQueryParamSchema>;