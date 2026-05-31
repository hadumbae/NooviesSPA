/**
 * @fileoverview Profile tab component that displays a paginated list of the current user's reservations.
 *
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MyReservationCompactCard} from "@/views/client/reservations/_comp";
import {CurrentUserReservationLoader} from "@/views/client/reservations/_feat";
import {PaginatedItems} from "@/common/types";
import {PopulatedReservation} from "@/domains/reservation/schema/model";
import {ReactElement} from "react";

/** Number of reservations displayed per page */
const RESERVATIONS_PER_PAGE = 20;

/** Props for the MyProfilePageReservationTab component. */
type TabProps = {
    tabValue: string;
    className?: string;
    page: number;
    setPage: (page: number) => void;
};

/**
 * Displays the user's reservation history in a paginated list within the profile tabs.
 */
export function MyProfilePageReservationTab(
    {page, setPage, tabValue, className}: TabProps
): ReactElement {
    return (
        <TabsContent value={tabValue} className={cn("flex flex-col space-y-4", className)}>
            <PrimaryHeaderText>My Reservations</PrimaryHeaderText>

            <CurrentUserReservationLoader page={page} perPage={RESERVATIONS_PER_PAGE}>
                {({totalItems, items: reservations}: PaginatedItems<PopulatedReservation>) => {
                    if (reservations.length === 0) {
                        return (
                            <EmptyArrayContainer
                                className="flex-1"
                                text="You have no reservations."
                            />
                        );
                    }

                    return (
                        <div className="space-y-4">
                            <section className="grid grid-cols-1 gap-2">
                                <SectionHeader srOnly={true}>
                                    My Reservations : List
                                </SectionHeader>

                                {reservations.map((reservation: PopulatedReservation) => (
                                    <MyReservationCompactCard
                                        key={reservation._id}
                                        reservation={reservation}
                                    />
                                ))}
                            </section>

                            {totalItems > RESERVATIONS_PER_PAGE && (
                                <PaginationRangeButtons
                                    page={page}
                                    perPage={RESERVATIONS_PER_PAGE}
                                    totalItems={totalItems}
                                    setPage={setPage}
                                />
                            )}
                        </div>
                    );
                }}
            </CurrentUserReservationLoader>
        </TabsContent>
    );
}
