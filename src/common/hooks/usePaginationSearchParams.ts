import {useSearchParams} from "react-router-dom";
import {paginationSearchParamSchema} from "@/common/schema/PaginationSearchParamsSchema.ts";

export default function usePaginationSearchParams(
    params?: { page: string, perPage: string }
) {
    // Set Values
    const defaultValues = params || {page: "1", perPage: "100"};
    const [searchParams, setSearchParams] = useSearchParams(defaultValues);

    // Validate Params
    const parsedParams = paginationSearchParamSchema.safeParse({
        page: searchParams.get("page"),
        perPage: searchParams.get("perPage"),
    });

    if (!parsedParams.success) {
        throw new Error("Invalid Pagination Params.");
    }

    // Get And Set Data
    const {page, perPage} = parsedParams.data;

    const setPage = (newPage: number | string) => {
        setSearchParams({...searchParams, page: newPage.toString()});
    }

    const setPerPage = (newPerPage: number | string) => {
        setSearchParams({...searchParams, perPage: newPerPage.toString()});
    }

    return {
        searchParams, setSearchParams,
        page, perPage,
        setPage, setPerPage,
    }
}