import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import {z, ZodTypeAny} from "zod";

/**
 * @summary
 * Parameters for `useFetchIDRouteParams`.
 *
 * @template TSchema
 * Zod schema used to validate route parameters.
 */
type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    /** Zod schema to validate the route parameters. Defaults to {@link IDRouteParamSchema}. */
    schema: TSchema;

    /** Path to navigate to if an error occurs. */
    errorTo: string;

    /** Optional custom error message displayed/logged on failure. */
    errorMessage?: string;

    /** Optional source component name for logging. */
    sourceComponent?: string;
};

/**
 * @summary
 * Hook to fetch and validate a route parameter by ID (or other keys via a custom schema).
 *
 * @description
 * Retrieves route parameters and validates them using a Zod schema.
 * By default, it expects an `_id` parameter using {@link IDRouteParamSchema},
 * but you can provide a custom schema to validate different parameters.
 *
 * On validation failure or other errors, the hook navigates to a fallback route
 * and optionally logs a warning with a message and source component.
 *
 * @template TSchema
 * Zod schema type for the route parameters.
 *
 * @param params
 * Configuration for schema validation, error handling, and logging.
 *
 * @returns
 * The validated route parameters (`z.infer<TSchema>`) or `null` if fetching/validation fails.
 *
 * @example
 * ```ts
 * // Default usage (_id)
 * const params = useFetchIDRouteParams({
 *   errorTo: "/not-found",
 *   errorMessage: "Missing or invalid ID in route",
 * });
 *
 * if (!params) return null;
 * console.log(params._id);
 *
 * // Custom schema
 * const params2 = useFetchIDRouteParams({
 *   schema: z.object({ slug: z.string() }),
 *   errorTo: "/not-found",
 * });
 * console.log(params2.slug);
 * ```
 */
export default function useFetchIDRouteParams<TSchema extends ZodTypeAny = ZodTypeAny>(
    params: FetchParams<TSchema>
): z.infer<TSchema> | null {
    // --- Params ---
    const {schema, errorTo, errorMessage, sourceComponent} = params;

    // --- Navigation & Logging ---
    const navigate = useLoggedNavigate();
    const onErrorMessage = errorMessage ?? "Failed to fetch route params. Please try again.";

    const onError = () => {
        navigate({
            level: "warn",
            to: errorTo,
            component: sourceComponent ?? useFetchIDRouteParams.name,
            message: onErrorMessage,
        });
    };

    // --- Route Params ---
    return useFetchRouteParams({
        schema,
        onError,
        onErrorMessage,
    });
}
