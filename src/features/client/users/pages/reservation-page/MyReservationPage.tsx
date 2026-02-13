/**
 * @file MyReservationPage.tsx
 * Reservation detail page container.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {Loader} from "lucide-react";
import {useFetchReservationBySlug} from "@/pages/reservation/fetch/useFetchReservationBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReservationDetailsSchema} from "@/pages/reservation/schema/model/reservation/ReservationDetails.schema.ts";
import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
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
        <ValidatedDataLoader query={query} schema={ReservationDetailsSchema}>
            {(reservation: ReservationDetails) => (
                <MyReservationPageContent reservation={reservation}/>
            )}
        </ValidatedDataLoader>
    );
};

export default MyReservationPage;
