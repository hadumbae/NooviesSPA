import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import { IDRouteParamSchema } from "@/common/schema/route-params/IDRouteParamSchema.ts";
import { z, ZodTypeAny } from "zod";

/**
 * Parameters for {@link useFetchByIdentifierRouteParams}.
 *
 * @template TSchema - Zod schema used to validate route parameters.
 */
type FetchParams<TSchema extends ZodTypeAny = ZodTypeAny> = {
    /** Zod schema used to validate the route parameters. */
    schema: TSchema;

    /** Route to navigate to when validation or retrieval fails. */
    errorTo: string;

    /** Optional error message used for logging and navigation context. */
    errorMessage?: string;

    /** Optional source component name for structured logging. */
    sourceComponent?: string;
};

/**
 * Fetch and validate route parameters using a Zod schema.
 *
 * @remarks
 * Retrieves route parameters and validates them against the provided schema.
 * While commonly used for `_id` parameters via {@link IDRouteParamSchema},
 * this hook supports any identifier shape by supplying a custom schema.
 *
 * On validation failure, the user is redirected to a fallback route and
 * a structured warning is logged.
 *
 * @template TSchema - Zod schema type for the expected route parameters.
 *
 * @param params - Validation, navigation, and logging configuration.
 *
 * @returns
 * The validated route parameters (`z.infer<TSchema>`) or `null` if validation fails.
 *
 * @example
 * ```ts
 * // Default ID-based usage
 * const params = useFetchByIdentifierRouteParams({
 *   schema: IDRouteParamSchema,
 *   errorTo: "/not-found",
 * });
 *
 * if (!params) return null;
 * console.log(params._id);
 *
 * // Custom identifier schema
 * const params2 = useFetchByIdentifierRouteParams({
 *   schema: z.object({ slug: z.string() }),
 *   errorTo: "/not-found",
 * });
 *
 * console.log(params2.slug);
 * ```
 */
export default function useFetchByIdentifierRouteParams<
    TSchema extends ZodTypeAny = ZodTypeAny,
>(
    params: FetchParams<TSchema>,
): z.infer<TSchema> | null {
    // --- Params ---
    const { schema, errorTo, errorMessage, sourceComponent } = params;

    // --- Navigation & Logging ---
    const navigate = useLoggedNavigate();
    const onErrorMessage =
        errorMessage ?? "Failed to fetch route params. Please try again.";

    const onError = () => {
        navigate({
            level: "warn",
            to: errorTo,
            component: sourceComponent ?? useFetchByIdentifierRouteParams.name,
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
