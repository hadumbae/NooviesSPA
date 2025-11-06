/**
 * @fileoverview Custom React hook for managing Genre Query Options via URL search parameters.
 *
 * This hook provides a typed interface for reading, validating, and updating
 * query parameters related to genres (filters and sorting). It integrates with
 * React Router's `useSearchParams` and uses Zod for schema validation.
 */

import { useSearchParams } from "react-router-dom";
import { GenreQueryOptions } from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import { GenreQueryOptionSchema } from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";
import stringifySearchParams from "@/common/utility/features/search-params/stringifySearchParams.ts";
import fetchParsedSearchParams from "@/common/utility/features/search-params/fetchParsedSearchParams.ts";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";

/**
 * Return type of {@link useGenreQueryOptionSearchParams}.
 */
type SearchParamsReturns = {
    /** The current parsed and validated genre query parameters. */
    searchParams: GenreQueryOptions;

    /**
     * Function to update the URL search parameters with new query values.
     * Automatically merges with existing parameters.
     */
    setSearchParams: (values: GenreQueryOptions) => void;
};

/**
 * React hook for synchronizing Genre Query Options with the URL search parameters.
 *
 * - Reads query params from the URL.
 * - Validates them using {@link GenreQueryOptionSchema}.
 * - Returns a `setSearchParams` function to update the URL state.
 *
 * @param {GenreQueryOptions} [defaultValues={}] - Default query parameters to use
 * when the URL is missing or incomplete.
 *
 * @returns {SearchParamsReturns} Parsed query options and a setter to update them.
 *
 * @example
 * ```tsx
 * const { searchParams, setSearchParams } = useGenreQueryOptionSearchParams({
 *   name: "Action",
 *   sortByName: "asc"
 * });
 *
 * // Read parsed params
 * console.log(searchParams.name); // "Action"
 *
 * // Update params
 * setSearchParams({ name: "Comedy", sortByName: "desc" });
 * ```
 */
export default function useGenreQueryOptionSearchParams(
    defaultValues: GenreQueryOptions = {}
): SearchParamsReturns {
    // ⚡ State ⚡
    const parsedDefaultValues = stringifySearchParams(defaultValues);
    const [searchParams, setSearchParams] = useSearchParams(parsedDefaultValues);

    // ⚡ Parsing ⚡
    const rawData = Object.fromEntries(searchParams.entries());
    const parsedSearchParams = fetchParsedSearchParams({
        schema: GenreQueryOptionSchema,
        raw: rawData,
    });

    // ⚡ Update ⚡
    const setQueryOptions = (values: GenreQueryOptions) => {
        const updatedSearchParams = updateSearchParams({
            searchParams,
            updateValues: values,
        });
        setSearchParams(updatedSearchParams);
    };

    return {
        searchParams: parsedSearchParams,
        setSearchParams: setQueryOptions,
    };
}
