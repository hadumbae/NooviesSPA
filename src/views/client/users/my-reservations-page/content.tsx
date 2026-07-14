/**
 * @fileoverview Main content layout for the user's personal reservations list.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/common/components/text/EmptyArrayContainer.tsx";
import {PopulatedReservation} from "@/domains/reservations/_schema";
import {MyReservationCompactCard} from "@/views/client/reservations/_comp";
import {ReactElement} from "react";
import {PageHeader} from "@/views/common/_comp";
import {MyProfileNavigation, MyProfileNavigationDropdown} from "@/views/client/users";
import {Separator} from "@/common/components/ui";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {
    MyReservationsQueryOptionForm,
    MyReservationsQueryOptionFormCollapsible,
    MyReservationsQueryOptionFormView
} from "@/views/client/reservations/_feat/my-reservations-query-option-form";

/** Props for the MyReservationsPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    reservations: PopulatedReservation[];
    totalReservations: number;
}

/** Renders the paginated list of user reservations or an empty state message. */
export function MyReservationsPageContent(
    {page, perPage, setPage, reservations, totalReservations}: ContentProps
): ReactElement {
    const isMobile = useIsMobile();

    return (
        <PageFlexWrapper>
            <PageHeader
                title="My Reservations"
                description="An Index Of All Your Reservations"
                actions={isMobile && <MyProfileNavigationDropdown/>}
            />

            <Separator/>

            {!isMobile && <MyProfileNavigation/>}

            <MyReservationsQueryOptionForm>
                <MyReservationsQueryOptionFormCollapsible>
                    <MyReservationsQueryOptionFormView/>
                </MyReservationsQueryOptionFormCollapsible>
            </MyReservationsQueryOptionForm>

            {
                reservations.length > 0 ? (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {reservations.map((reservation) => (
                            <MyReservationCompactCard
                                key={reservation._id}
                                reservation={reservation}
                            />
                        ))}
                    </section>
                ) : (
                    <EmptyArrayContainer
                        className="flex-1"
                        text="You have no reservations."
                    />
                )
            }

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalReservations}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}