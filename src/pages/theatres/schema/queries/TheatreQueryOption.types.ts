import {z} from "zod";
import {
    TheatreQueryFilterSchema,
    TheatreQueryOptionSchema,
    TheatreQuerySortSchema
} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";

export type TheatreQueryFilters = z.infer<typeof TheatreQueryFilterSchema>;

export type TheatreQuerySorts = z.infer<typeof TheatreQuerySortSchema>;

export type TheatreQueryOptions = z.infer<typeof TheatreQueryOptionSchema>;