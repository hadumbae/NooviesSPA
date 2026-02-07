/**
 * @file MyProfilePageReservationTab.tsx
 *
 * Profile tab displaying a limited snapshot of the current user's reservations.
 *
 * @remarks
 * - Currently shows a small, paginated subset of reservations.
 * - Intended as a lightweight preview, not a full management view.
 * - **INCOMPLETE**: requires UI/UX polish and a navigation link to the full
 *   client reservations page.
 *
 * @todo
 * - Add a clear CTA/link to the user's full reservations page.
 * - Review list UI
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import CurrentUserReservationLoader from "@/pages/reservation/components/loaders/CurrentUserReservationLoader.tsx";
import {PaginatedReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationRelated.types.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import MyReservationCompactCard from "@/features/client/reservations/components/cards/MyReservationCompactCard.tsx";
import {cn} from "@/common/lib/utils.ts";

type TabProps = {
    /** Tab identifier used by the parent Tabs component */
    tabValue: string;

    /** Optional container styling overrides */
    className?: string;
};

const MyProfilePageReservationTab = ({tabValue, className}: TabProps) => {
    return (
        <TabsContent value={tabValue} className={cn("flex flex-col space-y-4", className)}>
            <PrimaryHeaderText>My Reservations</PrimaryHeaderText>

            <CurrentUserReservationLoader perPage={3}>
                {({items: reservations}: PaginatedReservationDetails) => {
                    if (reservations.length === 0) {
                        return (
                            <EmptyArrayContainer
                                className="flex-1"
                                text="You have no reservations."
                            />
                        );
                    }

                    return (
                        <div className="grid grid-cols-1 gap-2">
                            {reservations.map((reservation: ReservationDetails) => (
                                <MyReservationCompactCard
                                    key={reservation._id}
                                    reservation={reservation}
                                />
                            ))}
                        </div>
                    );
                }}
            </CurrentUserReservationLoader>
        </TabsContent>
    );
};

export default MyProfilePageReservationTab;
