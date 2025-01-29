import {FC} from 'react';
import useShowingSeatMapSubmitForm from "@/pages/seatmap/hooks/forms/useShowingSeatMapSubmitForm.ts";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {SeatMapSubmit} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import SeatHookFormSelect from "@/pages/seats/components/SeatHookFormSelect.tsx";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

interface Props {
    showing: Showing;
    seatMap?: SeatMap;
}

const ShowingSeatMapSubmitForm: FC<Props> = ({showing, seatMap}) => {
    const populatedShowing = useValidatePopulatedShowing(showing);
    const {theatre: {_id: theatreID}} = populatedShowing;

    const form = useShowingSeatMapSubmitForm({showing, seatMap});

    const onFormSubmit = (values: SeatMapSubmit) => {
        console.log(values);
    }

    const {formState: {errors}} = form;
    console.log(errors);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
                {/*seat*/}
                <SeatHookFormSelect
                    name="seat"
                    label="Seat"
                    filters={{theatre: theatreID}}
                    control={form.control}
                />

                {/*price*/}
                <HookFormInput
                    name="price"
                    label="Price"
                    control={form.control}
                    description="The price of the seat."
                />

                {/*isAvailable*/}
                {/*isReserved*/}




                <Button type="submit" className="w-full bg-primary">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default ShowingSeatMapSubmitForm;
