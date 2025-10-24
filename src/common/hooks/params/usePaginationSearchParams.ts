import {useSearchParams} from "react-router-dom";
import {PaginationSearchParamSchema} from "@/common/schema/PaginationSearchParamsSchema.ts";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";
import {
    PaginationParamValues,
    UsePaginationSearchParamsReturn
} from "@/common/hooks/params/usePaginationSearchParams.types.ts";

const defaultPage = import.meta.env.VITE_PAGINATION_PAGE_DEFAULT;
const defaultPerPage = import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT;

const DEFAULT_VALUES: PaginationParamValues = { page: defaultPage, perPage: defaultPerPage };

export default function usePaginationSearchParams(
    presetValues: PaginationParamValues = DEFAULT_VALUES
): UsePaginationSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawData = {
        page: searchParams.get("page"),
        perPage: searchParams.get("perPage")
    };

    const {data, success} = PaginationSearchParamSchema.safeParse(rawData);
    const hasAnyParam = rawData.page !== null || rawData.perPage !== null;

    const {page = defaultPage, perPage = defaultPerPage} = success ? data : presetValues;

    const setParam = (key: keyof PaginationParamValues, value: number | string) => {
        setSearchParams(updateSearchParams({searchParams, updateValues: {[key]: value.toString()}}));
    }

    return {
        page,
        perPage,
        setPage: (newPage: number | string) => setParam("page", newPage),
        setPerPage: (newPerPage: number | string) => setParam("perPage", newPerPage),
        searchParams,
        setSearchParams,
        hasAnyParam,
        hasValidParams: success,
    }
}