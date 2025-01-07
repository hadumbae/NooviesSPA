import {FC, useEffect, useRef} from 'react';
import useSeatSubmitForm from "@/pages/seats/hooks/useSeatSubmitForm.ts";
import useSeatSubmitMutation from "@/pages/seats/hooks/useSeatSubmitMutation.ts";
import {SeatSubmit} from "@/pages/seats/schema/SeatSubmitSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import SeatTypeHookFormCombobox from "@/pages/seats/components/SeatTypeHookFormCombobox.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import TheatreHookFormCombobox from "@/pages/theatres/components/TheatreHookFormCombobox.tsx";
import ScreenHookFormCombobox from "@/pages/screens/components/ScreenHookFormCombobox.tsx";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    className?: string;
    seat?: Seat;
    onSubmit: (seat: Seat) => void;
}

const SeatSubmitForm: FC<Props> = ({className, seat, onSubmit}) => {
    const form = useSeatSubmitForm({seat});
    const {mutate, isPending, isSuccess} = useSeatSubmitMutation({form, onSubmit, _id: seat?._id});

    const theatre = form.watch("theatre");
    const isFirstRender = useRef<boolean>(false);
    const isSecondRender = useRef<boolean>(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (isSecondRender.current) {
            isSecondRender.current = false;
            return;
        }

        form.resetField("screen");
    }, [theatre]);

    const onFormSubmit = (values: SeatSubmit) => {
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className={cn("space-y-4", className)}>
                <HookFormInput
                    name="row"
                    label="Row"
                    control={form.control}
                />

                <HookFormInput
                    name="seatNumber"
                    label="Seat Number"
                    control={form.control}
                />

                <SeatTypeHookFormCombobox
                    form={form}
                    name="seatType"
                    label="Seat Type"
                    placeholder="Select A Seat Type"
                />

                <HookFormCheckbox
                    name="isAvailable"
                    label="Is Available?"
                    control={form.control}
                />

                <HookFormInput
                    name="priceMultiplier"
                    label="Price Multiplier"
                    control={form.control}
                    min={0}
                />

                <TheatreHookFormCombobox form={form} name="theatre" label="Theatre" />

                {
                    theatre &&
                    <ScreenHookFormCombobox form={form} name="screen" label="Screen" filters={{theatre}} />
                }

                <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={isPending || isSuccess}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatSubmitForm;
