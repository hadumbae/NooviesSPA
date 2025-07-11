import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import {Accordion} from "@/common/components/ui/accordion.tsx";
import useFetchScreenSeatsByRow from "@/pages/screens/hooks/screen-seats/useFetchScreenSeatsByRow.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {SeatsByRowArraySchema} from "@/pages/screens/schema/screen/ScreenSeat.schema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import SeatRowAccordionItem from "@/pages/seats/components/seats-by-row/SeatRowAccordionItem.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import SeatsByRowSubmitFormPanel
    from "@/pages/seats/components/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormPanel.tsx";

type SeatCardProps = {
    theatreID: ObjectId;
    screenID: ObjectId;
};

const ScreenSeatsByRowCard: FC<SeatCardProps> = ({theatreID, screenID}) => {
    const {data, isPending, isError, error: queryError} = useFetchScreenSeatsByRow({_id: screenID, populate: false});

    const {data: rows, success, error: parseError} = useValidateData({
        data,
        isPending,
        schema: SeatsByRowArraySchema,
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const presetValues = {screen: screenID, theatre: theatreID};
    const disableFields: (keyof SeatsByRowFormValues)[] = ["screen", "theatre"];

    return (
        <section className="space-y-4">
            {/* Seats By Row Form */}
            <Card>
                <CardHeader className="pb-0">
                    <section className="flex justify-between items-center">
                        <div>
                            <CardTitle>Seats By Row</CardTitle>
                            <CardDescription>Browse seats by rows.</CardDescription>
                        </div>

                        <SeatsByRowSubmitFormPanel
                            presetValues={presetValues}
                            disableFields={disableFields}
                        >
                            <Button variant="link">
                                <Plus/>
                            </Button>
                        </SeatsByRowSubmitFormPanel>
                    </section>
                </CardHeader>
                <CardContent className="p-5">
                    <Accordion type="single" collapsible>
                        {rows.map((rowData) => <SeatRowAccordionItem
                            key={`seat-row-${rowData.row}`}
                            value={`seat-row-${rowData.row}`}
                            rowData={rowData}
                        />)}
                    </Accordion>
                </CardContent>
            </Card>
        </section>
    );
};

export default ScreenSeatsByRowCard;
