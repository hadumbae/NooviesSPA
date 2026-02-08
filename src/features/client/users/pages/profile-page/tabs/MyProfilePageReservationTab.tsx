/**
 * @file MyProfilePageReservationTab.tsx
 *
 * Profile tab displaying a paginated preview of the current user's reservations.
 *
 * @remarks
 * - Renders a limited subset of reservations with pagination.
 * - Pagination controls are only shown when the total exceeds the page size.
 * - Intended as a lightweight overview, not a full reservations management view.
 * - **INCOMPLETE**: requires UI/UX refinement and a clear navigation path
 *   to the full client reservations page.
 *
 * @todo
 * - Add a CTA/link to the user's full reservations page.
 * - Improve compact card visual hierarchy.
 * - Revisit pagination behaviour for small result sets.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import CurrentUserReservationLoader from "@/pages/reservation/components/loaders/CurrentUserReservationLoader.tsx";
import {PaginatedReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationRelated.types.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import MyReservationCompactCard from "@/features/client/reservations/components/cards/MyReservationCompactCard.tsx";
import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/** Number of reservations displayed per page */
const RESERVATIONS_PER_PAGE = 20;

type TabProps = {
    /** Tab identifier used by the parent Tabs component */
    tabValue: string;

    /** Optional container styling overrides */
    className?: string;

    /** Current pagination page */
    page: number;

    /** Updates the current pagination page */
    setPage: (page: number) => void;
};

/**
 * Renders the reservations tab for the My Profile page.
 *
 * Displays a paginated list of compact reservation cards
 * and handles empty and small-result states gracefully.
 */
const MyProfilePageReservationTab = ({page, setPage, tabValue, className}: TabProps) => {
    return (
        <TabsContent value={tabValue} className={cn("flex flex-col space-y-4", className)}>
            <PrimaryHeaderText>My Reservations</PrimaryHeaderText>

            <CurrentUserReservationLoader page={page} perPage={RESERVATIONS_PER_PAGE}>
                {({totalItems, items: reservations}: PaginatedReservationDetails) => {
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

                                {reservations.map((reservation: ReservationDetails) => (
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
};

export default MyProfilePageReservationTab;
