/**
 * @fileoverview Individual card displaying a timestamped event in the reservation lifecycle.
 *
 */
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {DateTime} from "luxon";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {LucideIcon} from "lucide-react";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import {ReservationStatus} from "@/domains/reservation/schema/model";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the ReservationActiveDateCard component. */
type CardProps = {
    status: ReservationStatus;
    date?: DateTime;
    text: string;
    icon: LucideIcon
};

/**
 * Mapping of reservation statuses to specific Tailwind background color classes.
 */
const COLOUR_CSS = {
    RESERVED: "bg-blue-400",
    PAID: "bg-green-400",
    EXPIRED: "bg-amber-400",
    CANCELLED: "bg-red-400",
    REFUNDED: "bg-cyan-400",
};

/** A detailed status card showing an icon, a descriptive label, and a formatted timestamp. */
export function ReservationActiveDateCard(
    {status, text, date, icon: Icon}: CardProps
): ReactElement {
    const dateString = date ? date.toFormat("dd MMM, yy • HH : mm : ss") : "-";

    return (
        <Card>
            <CardContent className={cn(
                "p-4",
                "flex justify-center items-center space-x-10",
            )}>
                <div className={cn("rounded-[30px] text-white p-2", COLOUR_CSS[status])}>
                    <Icon/>
                </div>

                <div className="flex flex-col space-y-0">
                    <PrimarySpan className="font-extrabold uppercase line-clamp-1">
                        {text}
                    </PrimarySpan>

                    <SecondarySpan className="text-sm font-extralight line-clamp-1">
                        {dateString}
                    </SecondarySpan>
                </div>

            </CardContent>
        </Card>
    );
}