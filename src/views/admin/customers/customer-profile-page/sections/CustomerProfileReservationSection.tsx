// CustomerProfileReservationSection.tsx

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {Reservation} from "@/domains/reservation/schema/model";
import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";

type SectionProps = {
    code: UserUniqueCode;
    itemCount: number;
    reservations: Reservation[];
};

export const CustomerProfileReservationSection = (
    {code, itemCount, reservations}: SectionProps
) => {
    return (
        <section>
            <PageSectionHeader text={`Reservations (${itemCount})`} />

            <div className="grid grid-cols-1 gap-4">
                {
                    reservations.map(
                        (reservation) => <div key={reservation._id}>{reservation._id}</div>
                    )
                }
            </div>
        </section>
    );
};