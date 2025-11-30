import {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {Accordion} from "@/common/components/ui/accordion.tsx";
import useFetchScreenSeatsByRow from "@/pages/screens/hooks/screens-and-seats/useFetchScreenSeatsByRow.ts";
import {SeatsByRowArraySchema} from "@/pages/screens/schema/screen/ScreenSeat.schema.ts";
import SeatRowAccordionItem from "@/pages/seats/components/features/seats-by-row/SeatRowAccordionItem.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import SeatsByRowSubmitFormPanel
    from "@/pages/seats/components/features/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormPanel.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {SeatsByRow} from "@/pages/screens/schema/screen/ScreenSeat.types.ts";

/**
 * Props for the {@link TheatreScreenSeatsByRowCard} component.
 */
type SeatCardProps = {
    /**
     * The ObjectId of the theatre to which the screen belongs.
     */
    theatreID: ObjectId;

    /**
     * The ObjectId of the screen whose seat layout is being rendered.
     */
    screenID: ObjectId;
};

/**
 * Displays a card showing all seat rows for a given screen within a theatre.
 *
 * This component fetches seat data by row, validates it using Zod,
 * and displays each row inside an accordion. It also includes a form
 * panel to allow users to add more seat rows.
 *
 * Handles loading, HTTP, and validation errors gracefully using page-level error components.
 *
 * @component
 * @param props - Props including `theatreID` and `screenID` to fetch and render seat rows.
 */
const TheatreScreenSeatsByRowCard: FC<SeatCardProps> = ({theatreID, screenID}) => {
    const query = useFetchScreenSeatsByRow({_id: screenID, populate: false});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={SeatsByRowArraySchema}>
                {(rows: SeatsByRow[]) => {
                    const presetValues = {screen: screenID, theatre: theatreID};
                    const disableFields: (keyof SeatsByRowFormValues)[] = ["screen", "theatre"];

                    const hasContent = rows.length > 0;

                    const rowContent = (
                        <CardContent className="p-5">
                            <Accordion type="single" collapsible>
                                {rows.map((rowData) => <SeatRowAccordionItem
                                    key={`seat-row-${rowData.row}`}
                                    value={`seat-row-${rowData.row}`}
                                    rowData={rowData}
                                />)}
                            </Accordion>
                        </CardContent>
                    );

                    const panelComponent = (
                        <SeatsByRowSubmitFormPanel presetValues={presetValues} disableFields={disableFields}>
                            <Button variant="link">
                                <Plus/>
                            </Button>
                        </SeatsByRowSubmitFormPanel>
                    );

                    return (
                        <section className="space-y-4">
                            {/* Seats By Row Form */}
                            <Card>
                                <CardHeader className={cn(hasContent && "pb-0")}>
                                    <section className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Seats By Row</CardTitle>
                                            <CardDescription>Browse seats by rows.</CardDescription>
                                        </div>


                                        {panelComponent}
                                    </section>
                                </CardHeader>


                                {hasContent && rowContent}
                            </Card>
                        </section>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreScreenSeatsByRowCard;