/**
 * @file MyReservationPage.tsx
 * Reservation detail page container.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {Loader} from "lucide-react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import MyReservationPageContent from "@/views/client/users/pages/reservation-page/MyReservationPageContent.tsx";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservation/schema/model";
import {useFetchReservationBySlug} from "@/domains/reservation/features/client-reservations/fetch";

/**
 * Fetches and renders a reservation by slug.
 */
const MyReservationPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/account/profile",
    }) ?? {};

    if (!slug) {
        return <Loader/>;
    }

    const query = useFetchReservationBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PopulatedReservationSchema}>
            {(reservation: PopulatedReservation) => (
                <MyReservationPageContent reservation={reservation}/>
            )}
        </ValidatedDataLoader>
    );
};

export default MyReservationPage;
