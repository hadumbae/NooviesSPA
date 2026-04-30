/**
 * @fileoverview Main administrative directory for cinema locations.
 */

import { ReactElement } from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import { useParsedSearchParams } from "@/common/features/fetch-search-params";
import { TheatreQueryOptionSchema } from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOptionSchema.ts";
import { TheatreIndexPageContent } from "@/views/admin/theatres/index-page/content.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import { TheatreHttpStatusOverrideText } from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import { useFetchPaginatedTheatres } from "@/domains/theatres/_feat/crud-hooks";
import { QueryDataLoader } from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {
    PaginatedTheatreDetails,
    PaginatedTheatreDetailsSchema
} from "@/domains/theatres/schema/theatre/PaginatedTheatreDetailsSchema.ts";

/** Default number of theatre records displayed per pagination page. */
const THEATRES_PER_PAGE = 20;

/**
 * Root page component for the Theatre Management index view.
 */
export function TheatreIndexPage(): ReactElement {
    useTitle("Admin | Theatre Management");

    const { value: page, setValue: setPage } = useParsedPaginationValue("page", 1);
    const { searchParams } = useParsedSearchParams({ schema: TheatreQueryOptionSchema });

    const query = useFetchPaginatedTheatres({
        schema: PaginatedTheatreDetailsSchema,
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        config: { virtuals: true, populate: true },
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {(data: PaginatedTheatreDetails) => (
                    <TheatreIndexPageContent
                        theatres={data.items}
                        totalItems={data.totalItems}
                        page={page}
                        perPage={THEATRES_PER_PAGE}
                        setPage={setPage}
                    />
                )}
            </QueryDataLoader>
        </QueryErrorBoundary>
    );
}