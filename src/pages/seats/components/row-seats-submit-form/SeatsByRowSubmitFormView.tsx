import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import {UseMutationResult} from "@tanstack/react-query";
import {SeatsByRowForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/submit-form/ScreenHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import SeatTypeHookFormCombobox from "@/pages/seats/components/SeatTypeHookFormCombobox.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";

// TODO
// [] Interface
// [] Disable Fields / Active Fields

type FormViewProps = {
    form: UseFormReturn<SeatsByRowFormValues>;
    mutation: UseMutationResult<unknown, Error, SeatsByRowForm>;
    disableFields?: (keyof SeatsByRowFormValues)[];
    submitHandler: SubmitHandler<SeatsByRowFormValues>;
    className?: string;
}

const SeatsByRowSubmitFormView: FC<FormViewProps> = ({form, mutation, disableFields, submitHandler, className}) => {
    const {data, isPending} = mutation;

    const activeFields = {
        row: !disableFields?.includes("row"),
        numberOfSeats: !disableFields?.includes("numberOfSeats"),
        y: !disableFields?.includes("y"),
        theatre: !disableFields?.includes("theatre"),
        screen: !disableFields?.includes("screen"),
        seatType: !disableFields?.includes("seatType"),
        isAvailable: !disableFields?.includes("isAvailable"),
        priceMultiplier: !disableFields?.includes("priceMultiplier"),
    };

    const theatre = form.watch("theatre");
    const hasTheatre = theatre !== null && theatre !== undefined && theatre !== "";

    console.log("Data : ", data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {
                    activeFields["theatre"] &&
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                        control={form.control}
                    />
                }

                {
                    (hasTheatre && activeFields["screen"]) &&
                    <ScreenHookFormSelect
                        name="screen"
                        label="Screen"
                        filters={{theatre}}
                        control={form.control}
                    />
                }

                {
                    activeFields["row"] &&
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={form.control}
                    />
                }

                {
                    activeFields["y"] &&
                    <HookFormInput
                        name="y"
                        label="Row (Y Coordinate)"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {
                    activeFields["numberOfSeats"] &&
                    <HookFormInput
                        name="numberOfSeats"
                        label="Number Of Seats"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {
                    activeFields["seatType"] &&
                    <SeatTypeHookFormCombobox
                        form={form}
                        name="seatType"
                        label="Seat Type"
                    />
                }

                {
                    activeFields["priceMultiplier"] &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        control={form.control}
                    />
                }

                {
                    activeFields["priceMultiplier"] &&
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        control={form.control}
                    />
                }

                <Button
                    variant="default"
                    disabled={isPending}
                    className="w-full bg-primary"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatsByRowSubmitFormView;
