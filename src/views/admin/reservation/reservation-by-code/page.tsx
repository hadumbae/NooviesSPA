/**
 * @fileoverview Page component for administrative reservation lookup by unique code.
 */

import {
    ReservationByCodePageContent
} from "@/views/admin/reservation/reservation-by-code/content.tsx";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {
    FetchByCodeData,
    FetchByCodeDataSchema,
    FetchByCodeSearchParamsSchema
} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchReservationByCode} from "@/domains/reservation/views/admin/reservation-by-code/fetch";
import {ReactElement} from "react";

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
        <ValidatedDataLoader query={query} schema={FetchByCodeDataSchema}>
            {({reservation}: FetchByCodeData) => (
                <ReservationByCodePageContent
                    code={code}
                    reservation={reservation}
                />
            )}
        </ValidatedDataLoader>
    );
}