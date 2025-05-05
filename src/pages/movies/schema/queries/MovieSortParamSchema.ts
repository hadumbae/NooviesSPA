import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

export const MovieSortParamSchema = z.object({
    sortByReleaseDate: MongooseSortOrderSchema.optional(),
    sortByTitle: MongooseSortOrderSchema.optional(),
});

export type MovieSortParams = z.infer<typeof MovieSortParamSchema>;