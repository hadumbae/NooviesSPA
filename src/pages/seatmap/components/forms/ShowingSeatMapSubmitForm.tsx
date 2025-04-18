import {FC} from 'react';
import useShowingSeatMapSubmitForm from "@/pages/seatmap/hooks/forms/useShowingSeatMapSubmitForm.ts";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {SeatMapSubmit} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import useSeatMapSubmitMutation from "@/pages/seatmap/hooks/mutations/useSeatMapSubmitMutation.ts";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import ShowingSeatHookFormSelect from "@/pages/seatmap/components/forms/ShowingSeatHookFormSelect.tsx";

interface Props {
    showing: Showing;
    seatMap?: SeatMap;
    onSubmit?: (seatMap: SeatMap) => void;
}

const ShowingSeatMapSubmitForm: FC<Props> = ({showing, seatMap, onSubmit}) => {
    const form = useShowingSeatMapSubmitForm({showing, seatMap});
    const {mutate} = useSeatMapSubmitMutation({form, onSubmit, seatMap});

    const {_id: showingID} = showing;

    const onFormSubmit = (values: SeatMapSubmit) => {
        console.log("[Seat Map Submit] Values :", values);
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
                <ShowingSeatHookFormSelect
                    name="seat"
                    label="Seat"
                    placeholder="Select a seat."
                    description="The seat to be reserved."
                    showingID={showingID}
                    control={form.control}
                />

                <HookFormInput
                    name="price"
                    label="Price"
                    control={form.control}
                    description="The price of the seat."
                />

                <HookFormCheckbox
                    name="isAvailable"
                    label="Is Available"
                    control={form.control}
                />

                <Button type="submit" className="w-full bg-primary">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default ShowingSeatMapSubmitForm;
