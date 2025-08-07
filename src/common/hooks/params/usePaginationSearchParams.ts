import {useSearchParams} from "react-router-dom";
import {paginationSearchParamSchema} from "@/common/schema/PaginationSearchParamsSchema.ts";
import updateSearchParams from "@/common/utility/params/updateSearchParams.ts";

export default function usePaginationSearchParams(
    params?: { page?: string | number, perPage?: string | number },
) {
    // Set Values
    const defaultValues = {page: params?.page?.toString() || "1", perPage: params?.perPage?.toString() || "10"};
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
        const newSearchParams = updateSearchParams({searchParams, updateValues: {page: newPage.toString()}})
        setSearchParams(newSearchParams);
    }

    const setPerPage = (newPerPage: number | string) => {
        const newSearchParams = updateSearchParams({searchParams, updateValues: {perPage: newPerPage.toString()}})
        setSearchParams(newSearchParams);
    }

    return {
        searchParams, setSearchParams,
        page, perPage,
        setPage, setPerPage,
    }
}