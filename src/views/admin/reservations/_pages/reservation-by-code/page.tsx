/**
 * @fileoverview Page component for administrative reservation lookup by unique code.
 */

import {ReactElement} from "react";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {ReservationByCodePageContent} from "@/views/admin/reservations/_pages/reservation-by-code/content.tsx";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {FetchByCodeData, FetchByCodeSearchParamsSchema, useFetchReservationByCode,} from "@/domains/reservation";

/**
 * Coordinates search parameter parsing and data fetching for the reservation lookup view.
 */
export function ReservationByCodePage(): ReactElement {
    const {searchParams: {code}} = useParsedSearchParams({
        schema: FetchByCodeSearchParamsSchema
    });

    const query = useFetchReservationByCode({
        code: code!,
        options: {enabled: !!code},
    });

    if (!code) {
        return (
            <ReservationByCodePageContent
                code={null}
                reservation={null}
            />
        );
    }

    return (
        <QueryDataLoader query={query}>
            {({reservation}: FetchByCodeData) => (
                <ReservationByCodePageContent code={code} reservation={reservation}/>
            )}
        </QueryDataLoader>
    );
}