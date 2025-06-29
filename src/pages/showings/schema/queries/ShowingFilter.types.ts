import {
    ShowingQueryFilterSchema,
    ShowingQuerySortSchema
} from "@/pages/showings/schema/queries/ShowingFilter.schema.ts";
import {z} from "zod";

export type ShowingQuerySort = z.infer<typeof ShowingQuerySortSchema>;
export type ShowingQueryFilters = z.infer<typeof ShowingQueryFilterSchema>;
