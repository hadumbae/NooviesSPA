import {
    PersonQueryFilters,
    PersonQueryFilterSchema
} from "@/domains/persons/_schema/query-options/PersonQueryFilterSchema.ts";
import {PersonQuerySorts, PersonQuerySortSchema} from "@/domains/persons/_schema/query-options/PersonQuerySortSchema.ts";
import {
    PersonQueryOptions,
    PersonQueryOptionsSchema
} from "@/domains/persons/_schema/query-options/PersonQueryOptionsSchema.ts";

export {
    PersonQueryFilterSchema,
    PersonQuerySortSchema,
    PersonQueryOptionsSchema,
}

export type {
    PersonQueryFilters,
    PersonQuerySorts,
    PersonQueryOptions,
}

