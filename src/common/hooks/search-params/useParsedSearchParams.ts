import stringifySearchParams from "@/common/utility/features/search-params/stringifySearchParams.ts";
import {useSearchParams} from "react-router-dom";
import fetchParsedSearchParams from "@/common/utility/features/search-params/fetchParsedSearchParams.ts";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";
import {z, ZodObject, ZodRawShape} from "zod";

/**
 * Parameters accepted by {@link useParsedSearchParams}.
 *
 * @typeParam TShape - The Zod raw shape describing the structure of query parameters.
 * @typeParam TOptions - The inferred query parameter type derived from `TShape`.
 *
 * @property {ZodObject<TShape>} schema - Zod schema used to parse and validate the URL parameters.
 * @property {TOptions} [defaultValues] - Optional default values used when the URL lacks certain parameters.
 */
export type ParsedSearchParamHookParams<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    defaultValues?: TOptions;
    schema: ZodObject<TShape>;
};

/**
 * The return type of {@link useParsedSearchParams}.
 *
 * @typeParam TShape - The Zod raw shape describing the structure of query parameters.
 * @typeParam TOptions - The inferred query parameter type derived from `TShape`.
 *
 * @property {z.infer<ZodObject<TShape>>} searchParams - The parsed and validated query parameters as a typed object.
 * @property {(values: TOptions) => void} setSearchParams - Updates query parameters and synchronizes them with the browser URL.
 */
export type ParsedSearchParamHookReturns<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    searchParams: z.infer<ZodObject<TShape>>;
    setSearchParams: (values: TOptions) => void;
};

/**
 * React hook for synchronizing typed and schema-validated query parameters
 * with the browser’s URL using React Router’s `useSearchParams`.
 *
 * @remarks
 * This generic hook enables developers to strongly type and validate URL-based
 * query state using Zod schemas. It automatically parses URL parameters,
 * provides defaults, and updates the URL whenever query values change.
 *
 * @typeParam TShape - The Zod raw shape describing the structure of query parameters.
 * @typeParam TOptions - The inferred query parameter type derived from `TShape`.
 *
 * @param {ParsedSearchParamHookParams<TShape, TOptions>} params - Hook configuration object.
 * @returns {ParsedSearchParamHookReturns<TShape, TOptions>} Parsed and validated query parameters, along with an update function.
 *
 * @example
 * ```tsx
 * import {z} from "zod";
 * import useParsedSearchParams from "@/common/hooks/useParsedSearchParams.ts";
 *
 * const UserQuerySchema = z.object({
 *   name: z.string().optional(),
 *   age: z.coerce.number().optional(),
 *   sortBy: z.enum(["asc", "desc"]).optional(),
 * });
 *
 * function UsersPage() {
 *   const { searchParams, setSearchParams } = useParsedSearchParams({
 *     schema: UserQuerySchema,
 *     defaultValues: { sortBy: "asc" },
 *   });
 *
 *   // Access validated params
 *   console.log(searchParams.name);
 *
 *   // Update params
 *   const handleSortChange = () => {
 *     setSearchParams({ ...searchParams, sortBy: "desc" });
 *   };
 *
 *   return <button onClick={handleSortChange}>Sort Descending</button>;
 * }
 * ```
 */
export default function useParsedSearchParams<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
>(
    params: ParsedSearchParamHookParams<TShape, TOptions>,
): ParsedSearchParamHookReturns<TShape, TOptions> {
    const {defaultValues, schema} = params;

    // ⚡ State ⚡
    const parsedDefaultValues = stringifySearchParams(defaultValues ?? {});
    const [searchParams, setSearchParams] = useSearchParams(parsedDefaultValues);

    // ⚡ Parsing ⚡
    const rawData = Object.fromEntries(searchParams.entries());
    const parsedSearchParams = fetchParsedSearchParams({raw: rawData, schema});

    // ⚡ Update ⚡
    const setQueryOptions = (values: TOptions) => {
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
