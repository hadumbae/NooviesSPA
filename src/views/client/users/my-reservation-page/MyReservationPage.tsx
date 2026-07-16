/**
 * @fileoverview Page container that fetches and displays a specific reservation based on route parameters.
 */

import {
    useFetchByIdentifierRouteParams
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {Loader} from "lucide-react";
import {
    MyReservationPageContent
} from "@/views/client/users/my-reservation-page/MyReservationPageContent.tsx";
import {useFetchReservationBySlug} from "@/domains/reservations/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservations/_schema/model";
import {ReactElement} from "react";

/**
 * Displays the details of a specific reservation identified by its slug.
 */
export function MyReservationPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/account/profile",
    }) ?? {};

    const query = useFetchReservationBySlug({
        slug: slug!,
        config: {populate: true, virtuals: true},
        schema: PopulatedReservationSchema,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <Loader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(reservation: PopulatedReservation) => (
                <MyReservationPageContent reservation={reservation}/>
            )}
        </QueryDataLoader>
    );
}
