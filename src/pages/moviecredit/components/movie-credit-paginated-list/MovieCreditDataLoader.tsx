/**
 * @file MovieCreditDataLoader.tsx
 * @description
 * Generic data loader component for fetching and validating movie credit data.
 *
 * Combines query execution via {@link useFetchMovieCredits} with schema
 * validation using {@link ValidatedDataLoader}, allowing consumers to
 * declaratively load and render typed credit data.
 */

import {MovieCreditQueryOptions} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {useFetchMovieCredits} from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import {z, ZodTypeAny} from "zod";
import {ReactNode} from "react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Props for {@link MovieCreditDataLoader}.
 *
 * @template TSchema - Zod schema used to validate the response data.
 */
type LoaderProps<TSchema extends ZodTypeAny = ZodTypeAny> =
    MovieCreditQueryOptions & RequestOptions & {
    /**
     * Zod schema used to validate the fetched movie credit data.
     */
    schema: TSchema;

    /**
     * Render prop receiving validated and typed data.
     */
    children: (data: z.infer<TSchema>) => ReactNode;
};

/**
 * Fetches movie credit data and renders children once the data
 * has been successfully validated against the provided schema.
 *
 * Query behavior (filters, population, virtuals, limits) is controlled
 * via props and forwarded to {@link useFetchMovieCredits}.
 *
 * @param props - Loader configuration and render function.
 *
 * @example
 * ```tsx
 * <MovieCreditDataLoader
 *   movie={movieId}
 *   populate
 *   schema={MovieCreditDetailsArraySchema}
 * >
 *   {(credits) => <CreditsList credits={credits} />}
 * </MovieCreditDataLoader>
 * ```
 */
const MovieCreditDataLoader = (props: LoaderProps) => {
    const {children, schema, populate, virtuals, limit, ...queries} = props;

    const query = useFetchMovieCredits({
        config: {populate, virtuals, limit},
        queries,
    });

    return (
        <ValidatedDataLoader query={query} schema={schema}>
            {children}
        </ValidatedDataLoader>
    );
};

export default MovieCreditDataLoader;
