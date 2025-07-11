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
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import DeleteSeatWarning from "@/pages/seats/components/delete-seats/DeleteSeatWarning.tsx";

type ScreenProps = {
    className?: string;
    seat: Seat;
}

const ScreenSeatDetailsPanel: FC<PropsWithChildren<ScreenProps>> = ({children, className, seat}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const {_id, row, seatNumber, seatLabel, seatType, isAvailable, x, y, priceMultiplier} = seat;

    const seatTitle = seatLabel ? seatLabel : `${row}${seatNumber}`;
    const availability = isAvailable ? "Available" : "Unavailable";
    const coordinates = x && y ? `X${x}, Y${y}` : "No coordinates";

    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    const onEdit = () => {
        setValue("");
    }

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
