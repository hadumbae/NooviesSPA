/**
 * @fileoverview Collapsible container for the reservation query option form that displays active filters.
 */

import {ReactElement, ReactNode, useState} from "react";
import {useParsedSearchParams} from "@/common/_feat";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui";
import {ChevronsUpDown} from "lucide-react";
import {
    CurrentUserReservationsQueryOptionSchema,
    ReservationStatusLabelMap,
    ReservationTypeLabelMap
} from "@/domains/reservations";

type CollapsibleProps = {
    children: ReactNode;
};

/**
 * A collapsible wrapper that displays a summary of active reservation filters in the trigger button.
 */
export function MyReservationsQueryOptionFormCollapsible(
    {children}: CollapsibleProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {
        searchParams: {uniqueCode, status, reservationType, sortByDateReserved, sortByStatus},
    } = useParsedSearchParams({schema: CurrentUserReservationsQueryOptionSchema});

    const filterText = [
        uniqueCode && uniqueCode,
        status && ReservationStatusLabelMap[status],
        reservationType && ReservationTypeLabelMap[reservationType],
        sortByStatus && "Sorted By Status",
        sortByDateReserved && "Sorted By Date Reserved",
    ].filter(Boolean);

    const spanText = filterText.length
        ? "Toggle Filters • " + filterText.join(", ")
        : "Toggle Filters";

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="secondary-text">
                    <ChevronsUpDown/>
                    <span>{spanText}</span>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border p-3 rounded-md w-fit">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}