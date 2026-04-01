/**
 * @file Smart component for administrative reservation lookup by unique code.
 * @filename ReservationByCodePage.tsx
 */

import {
    ReservationByCodePageContent
} from "@/views/admin/reservation/reservation-by-code/pages/ReservationByCodePageContent.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    FetchByCodeSearchParamsSchema,
    FetchByCodeData
} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import {FetchByCodeLoader} from "@/views/admin/reservation/reservation-by-code/components/loaders";

/**
 * Higher-order page component that coordinates search parameter parsing and data fetching.
 */
export const ReservationByCodePage = () => {
    const {searchParams: {code}} = useParsedSearchParams({
        schema: FetchByCodeSearchParamsSchema
    });

    if (!code) {
        return (
            <FetchByCodeLoader isEnabled={false}>
                {(uniqueCode) => (
                    <ReservationByCodePageContent
                        code={uniqueCode}
                        reservation={null}
                    />
                )}
            </FetchByCodeLoader>
        );
    }

    return (
        <FetchByCodeLoader code={code}>
            {(data: FetchByCodeData) => {
                const {reservation} = data;

                return (
                    <ReservationByCodePageContent
                        code={code}
                        reservation={reservation}
                    />
                );
            }}
        </FetchByCodeLoader>
    );
};