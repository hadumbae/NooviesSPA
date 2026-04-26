import {z} from "zod";
import {
    TheatreQueryFilterSchema,
    TheatreQueryOptionSchema,
    TheatreQuerySortSchema
} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOption.schema.ts";

export type TheatreQueryFilters = z.infer<typeof TheatreQueryFilterSchema>;

export type TheatreQuerySorts = z.infer<typeof TheatreQuerySortSchema>;

export type TheatreQueryOptions = z.infer<typeof TheatreQueryOptionSchema>;