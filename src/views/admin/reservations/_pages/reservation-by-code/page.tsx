/**
 * @fileoverview Page component for administrative reservation lookup by unique code.
 */

import {ReactElement} from "react";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {ReservationByCodePageContent} from "@/views/admin/reservations/_pages/reservation-by-code/content.tsx";
import {QueryDataLoader} from "@/views/common/_feat";
import {FetchByCodeData} from "@/domains/reservations/_feat/fetch-reservation-by-code/schemas/FetchByCodeDataSchema.ts";
import {
    FetchByCodeSearchParamsSchema
} from "@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form/FetchByCodeSearchParamsSchema.ts";
import {
    useFetchReservationByCode
} from "@/domains/reservations/_feat/fetch-reservation-by-code/fetch/useFetchReservationByCode.ts";

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