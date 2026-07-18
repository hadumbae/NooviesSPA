/**
 * @fileoverview A data loader component for lazy loading movie credits using
 * the `useFetchMovieCredits` hook, useful for lazy loading movie credits.
 */

import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {useFetchMovieCredits} from "@/domains/movie-credits/_feat/crud-hooks/useFetchMovieCredits.ts";
import {z, ZodTypeAny} from "zod";
import {ReactElement, ReactNode} from "react";
import {MovieCreditQueryOptions} from "@/domains/movie-credits/_schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat";

/** Props for the MovieCreditDataLazyLoader component. */
type LoaderProps<TSchema extends ZodTypeAny = ZodTypeAny> = {
    schema: TSchema;
    children: (data: z.infer<TSchema>) => ReactNode;
    config?: RequestOptions;
    queries?: MovieCreditQueryOptions;
};

/** Fetches movie credits and provides the validated data to its children via a render prop. */
export function MovieCreditDataLazyLoader({children, schema, queries, config}: LoaderProps): ReactElement {
    const query = useFetchMovieCredits({config, queries, schema});

    return (
        <QueryDataLoader query={query}>
            {children}
        </QueryDataLoader>
    );
}
