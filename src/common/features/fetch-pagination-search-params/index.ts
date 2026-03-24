import {
    PaginationSearchParams,
    PaginationSearchParamsSchema
} from "@/common/features/fetch-pagination-search-params/schemas/PaginationSearchParamsSchema.ts";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import {
    PaginationValue,
    PaginationValueSchema
} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValueSchema.ts";
import {getPaginationDefaultValue} from "@/common/features/fetch-pagination-search-params/getPaginationDefaultValue.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import usePaginationSearchParams
    from "@/common/features/fetch-pagination-search-params/hooks/usePaginationSearchParams.ts";

export {
    getPaginationDefaultValue,
    PaginationValueSchema,
    PaginationValuesSchema,
    PaginationSearchParamsSchema,
    useParsedPaginationValue,
    usePaginationSearchParams,
}
export type {
    PaginationSearchParams,
    PaginationValues,
    PaginationValue,
}