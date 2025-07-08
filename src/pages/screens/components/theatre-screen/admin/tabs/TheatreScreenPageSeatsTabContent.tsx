import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchSeats from "@/pages/seats/hooks/fetch/useFetchSeats.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {SeatArraySchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import SeatsByRowSubmitFormContainer
    from "@/pages/seats/components/row-seats-submit-form/SeatsByRowSubmitFormContainer.tsx";
import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";

type SeatsTabProps = {
    theatreID: ObjectId;
    screenID: ObjectId;
};

const TheatreScreenPageSeatsTabContent: FC<SeatsTabProps> = ({theatreID, screenID}) => {
    const {data, isPending, isError, error: queryError} = useFetchSeats({
        theatre: theatreID,
        screen: screenID,
        paginated: false,
        populate: false,
        virtuals: false
    });

    const {data: seats, success: parseSuccess, error: parseError} = useValidateData({
        isPending,
        data,
        schema: SeatArraySchema,
        message: "Invalid Seat Data."
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!parseSuccess) return <PageParseError error={parseError}/>;

    const presetValues = {screen: screenID, theatre: theatreID};
    const disableFields: (keyof SeatsByRowFormValues)[] = ["screen", "theatre"];

    return (
        <section className="space-y-4">
            {/* Seats By Row Form */}

            <Card>
                <CardHeader>
                    <CardTitle>Add Seats By Row</CardTitle>
                    <CardDescription>Create seats by row.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SeatsByRowSubmitFormContainer
                        presetValues={presetValues}
                        disableFields={disableFields}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Seats By Row</CardTitle>
                    <CardDescription>Browse seats by rows.</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                    <section>
                        {seats.map(seat => <p key={seat._id}> - {seat.row} {seat.seatNumber} - </p>)}
                    </section>
                </CardContent>
            </Card>
        </section>
    );
};

export default TheatreScreenPageSeatsTabContent;
