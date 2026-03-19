/**
 * @file MyReservationPage.tsx
 * Reservation detail page container.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {Loader} from "lucide-react";
import {useFetchReservationBySlug} from "@/domains/reservation/fetch/useFetchReservationBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    PopulatedReservation,
    PopulatedReservationSchema
} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";
import MyReservationPageContent from "@/features/client/users/pages/reservation-page/MyReservationPageContent.tsx";

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
