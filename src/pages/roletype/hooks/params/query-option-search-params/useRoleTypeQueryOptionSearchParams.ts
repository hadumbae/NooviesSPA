import {useSearchParams} from "react-router-dom";
import {RoleTypeQueryOptions} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import parseSearchParams from "@/common/utility/features/search-params/parseSearchParams.ts";
import {RoleTypeQueryOptionsSchema} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";
import stringifySearchParams from "@/common/utility/features/search-params/stringifySearchParams.ts";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";

/**
 * Custom hook to manage role type query options via URL search parameters.
 *
 * This hook integrates with React Router's {@link useSearchParams} to:
 * - Parse existing query parameters into a strongly-typed {@link RoleTypeQueryOptions} object.
 * - Provide a safe way to update search parameters using schema validation.
 * - Allow initializing with default values.
 *
 * @param defaultValues - Optional default query option values
 * that are stringified and used if no search params exist.
 *
 * @returns An object containing:
 * - `searchParams`: The parsed query parameters, validated against {@link RoleTypeQueryOptionsSchema}.
 * - `setSearchParams`: Direct setter function from React Router for raw `URLSearchParams`.
 * - `setQueryOptionValues`: Helper function to update search params with typed values.
 *
 * @example
 * ```tsx
 * const { searchParams, setQueryOptionValues } = useRoleTypeQueryOptionSearchParams({
 *   department: "Engineering",
 *   page: 1,
 * });
 *
 * console.log(searchParams.department); // "Engineering"
 *
 * // Update the search params to include a new filter
 * setQueryOptionValues({ department: "HR" });
 * ```
 */
export default function useRoleTypeQueryOptionSearchParams(defaultValues: RoleTypeQueryOptions = {}) {
    /** Default values converted into a stringified form for initializing `useSearchParams`. */
    const parsedDefaultValues = stringifySearchParams(defaultValues);

    /** Current URL search params and setter, managed by React Router. */
    const [searchParams, setSearchParams] = useSearchParams(parsedDefaultValues);

    /** Raw data extracted from search params as a key-value object. */
    const rawData = Object.fromEntries(searchParams.entries());

    /** Parsed and validated query options according to the schema. */
    const parsedSearchParams = parseSearchParams({schema: RoleTypeQueryOptionsSchema, raw: rawData});

    /**
     * Updates the query parameters with new values,
     * merging them with the existing ones.
     *
     * @param values - Partial or full {@link RoleTypeQueryOptions} to update in the URL.
     */
    const setQueryOptionValues = (values: RoleTypeQueryOptions) => {
        const updatedSearchParams = updateSearchParams({searchParams, updateValues: values});
        setSearchParams(updatedSearchParams);
    };

    return {
        searchParams: parsedSearchParams,
        setSearchParams,
        setQueryOptionValues,
    };
}