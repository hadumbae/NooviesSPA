/**
 * @fileoverview Main administrative directory for cinema locations.
 */

import {ReactElement} from "react";
import {useTitle} from "@/common/_feat";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {TheatreIndexPageContent} from "@/views/admin/theatres/_pages/index-page/content.tsx";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/_const/TheatreHttpStatusOverrideText.ts";
import {useFetchPaginatedTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {PaginatedItems} from "@/common/_types";

import {TheatreDetails, TheatreDetailsSchema, TheatreQueryOptionSchema} from "@/domains/theatres";

/** Default number of theatre records displayed per pagination page. */
const THEATRES_PER_PAGE = 20;

/**
 * Root page component for the Theatre Management index view.
 */
export function TheatreIndexPage(): ReactElement {
    useTitle("Admin | Theatre Management");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const query = useFetchPaginatedTheatres({
        schema: generatePaginationSchema(TheatreDetailsSchema),
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {(data: PaginatedItems<TheatreDetails>) => (
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