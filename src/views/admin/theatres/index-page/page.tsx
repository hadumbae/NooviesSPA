/**
 * @fileoverview Main administrative directory for cinema locations.
 * * This page acts as the central hub for the theatre management module. It
 * coordinates between the browser's URL (for saving search and page state),
 * the database (to fetch theatre records), and the user interface.
 */

import { ReactElement } from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import { PaginatedTheatreDetailsSchema } from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import { PaginatedTheatreDetails } from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import { useParsedSearchParams } from "@/common/features/fetch-search-params";
import { TheatreQueryOptionSchema } from "@/domains/theatres/schema/queries/TheatreQueryOption.schema.ts";
import { TheatreIndexPageContent } from "@/views/admin/theatres/index-page/content.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import { TheatreHttpStatusOverrideText } from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import { useFetchPaginatedTheatres } from "@/domains/theatres/_feat/crud-hooks";
import { QueryDataLoader } from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Defines how many theatres are shown in the list at once.
 */
const THEATRES_PER_PAGE = 20;

/**
 * **Theatre Management Index**
 * ---
 * This is the primary "list view" for administrators to browse and search
 * for theatres.
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