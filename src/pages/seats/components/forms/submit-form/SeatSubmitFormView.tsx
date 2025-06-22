import {FC} from 'react';

import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";

import ScreenHookFormSelect from "@/pages/screens/components/inputs/ScreenHookFormSelect.tsx";
import SeatTypeHookFormCombobox from "@/pages/seats/components/SeatTypeHookFormCombobox.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";

import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";

type FormProps = {
    className?: string;
    form: UseFormReturn<SeatFormValues>;
    mutation: UseMutationResult<Seat, Error, SeatForm>
    submitHandler: SubmitHandler<SeatFormValues>
};

const SeatSubmitFormView: FC<FormProps> = ({className, form, mutation, submitHandler}) => {
    const theatre = form.watch("theatre");
    const {isPending, isSuccess} = mutation;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                <HookFormInput name="row" label="Row" control={form.control}/>

                <HookFormInput name="seatNumber" label="Seat Number" control={form.control}/>

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

                <TheatreHookFormSelect
                    control={form.control}
                    name="theatre"
                    label="Theatre"
                />

                {
                    theatre &&
                    <ScreenHookFormSelect
                        control={form.control}
                        name="screen"
                        label="Screen"
                        filters={{theatre}}
                    />
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

export default SeatSubmitFormView;
