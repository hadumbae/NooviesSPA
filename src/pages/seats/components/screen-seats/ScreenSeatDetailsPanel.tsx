import {FC, PropsWithChildren, useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/common/components/ui/accordion.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import DeleteSeatWarning from "@/pages/seats/components/delete-seats/DeleteSeatWarning.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Props for the {@link ScreenSeatDetailsPanel} component.
 */
type ScreenProps = {
    /** Optional CSS class for the trigger button or wrapper element. */
    className?: string;

    /** The seat object to display details for and edit/delete. */
    seat: Seat;
};

/**
 * A panel that displays detailed information about a seat and allows editing or deleting it.
 *
 * The panel opens in a sheet triggered by the provided children or a default button.
 * Includes:
 * - Seat title and type
 * - Availability, coordinates, and price multiplier
 * - Accordion for editing or deleting the seat
 *
 * @component
 * @param props - Component props.
 * @param props.seat - The seat object to display and manage.
 * @param props.className - Optional CSS classes for styling the trigger element.
 * @param props.children - Optional trigger element; defaults to a "Open" button.
 *
 * @returns A JSX element rendering a sheet with seat details and actions.
 */
const ScreenSeatDetailsPanel: FC<PropsWithChildren<ScreenProps>> = ({children, className, seat}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const {_id, row, seatNumber, seatLabel, seatType, isAvailable, x, y, priceMultiplier} = seat;

    /** Display title for the seat: label if available, otherwise row+number. */
    const seatTitle = seatLabel ? seatLabel : `${row}${seatNumber}`;

    /** Text representing the seat's availability. */
    const availability = isAvailable ? "Available" : "Unavailable";

    /** Text representing the seat coordinates or fallback if missing. */
    const coordinates = x && y ? `X${x}, Y${y}` : "No coordinates";

    /** Fields to disable in the edit form. */
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    /** Callback fired when the seat edit form successfully submits. */
    const onEdit = () => {
        setValue(""); // Collapse the accordion after editing
    };

    /** Callback fired when the seat is deleted; closes the sheet. */
    const onDelete = async () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className={className}>
                {children ? children : <Button variant="link">Open</Button>}
            </SheetTrigger>
            <SheetContent className="space-y-5">
                <SheetHeader>
                    <SheetTitle>{seatTitle}</SheetTitle>
                    <SheetDescription>{seatType} | {availability}</SheetDescription>
                </SheetHeader>

                <section className="grid grid-cols-3 gap-2">
                    <DetailsCardSpan label="Price Multiplier" text={`x${priceMultiplier}`}/>
                    <DetailsCardSpan label="Coordinates" text={coordinates}/>
                    <DetailsCardSpan label="Is Available?" text={isAvailable ? "Yes" : "No"}/>
                </section>

                <section>
                    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
                        <AccordionItem value="screen-row-accordion-edit">
                            <AccordionTrigger>Edit Seat</AccordionTrigger>
                            <AccordionContent>
                                <SeatSubmitFormContainer
                                    onSubmitSuccess={onEdit}
                                    disableFields={disableFields}
                                    isEditing={true}
                                    seat={seat}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="screen-row-accordion-delete">
                            <AccordionTrigger>Delete</AccordionTrigger>
                            <AccordionContent className="flex flex-col items-center space-y-5">
                                <DeleteSeatWarning seatID={_id} onDelete={onDelete}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </SheetContent>
        </Sheet>
    );
};

export default ScreenSeatDetailsPanel;
