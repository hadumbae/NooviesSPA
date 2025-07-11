import {FC} from 'react';

import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";

import ScreenHookFormSelect from "@/pages/screens/components/submit-form/ScreenHookFormSelect.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";

import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import SeatTypeHookFormSelect from "@/pages/seats/components/forms/inputs/SeatTypeHookFormSelect.tsx";

type FormProps = {
    className?: string;
    form: UseFormReturn<SeatFormValues>;
    mutation: UseMutationResult<Seat, Error, SeatForm>
    submitHandler: SubmitHandler<SeatFormValues>
    disableFields?: (keyof SeatFormValues)[];
};

const SeatSubmitFormView: FC<FormProps> = ({className, form, mutation, submitHandler, disableFields}) => {
    const theatre = form.watch("theatre");
    const {isPending, isSuccess} = mutation;

    const activeFields = {
        row: !disableFields?.includes("row"),
        seatNumber: !disableFields?.includes("seatNumber"),
        seatLabel: !disableFields?.includes("seatLabel"),
        seatType: !disableFields?.includes("seatType"),
        isAvailable: !disableFields?.includes("isAvailable"),
        priceMultiplier: !disableFields?.includes("priceMultiplier"),
        x: !disableFields?.includes("x"),
        y: !disableFields?.includes("y"),
        theatre: !disableFields?.includes("theatre"),
        screen: !disableFields?.includes("screen"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {
                    activeFields["row"] &&
                    <HookFormInput name="row" label="Row" control={form.control}/>
                }

                {
                    activeFields["seatNumber"] &&
                    <HookFormInput
                        name="seatNumber"
                        label="Seat Number"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {
                    activeFields["seatLabel"] &&
                    <HookFormInput name="seatLabel" label="Seat Label" control={form.control}/>
                }

                {
                    activeFields["seatType"] &&
                    <SeatTypeHookFormSelect name="seatType" label="Seat Type" control={form.control} />
                }

                {
                    activeFields["isAvailable"] &&
                    <HookFormCheckbox name="isAvailable" label="Is Available?" control={form.control}/>
                }

                {
                    activeFields["priceMultiplier"] &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={form.control}
                    />
                }

                {
                    (activeFields["x"] || activeFields["y"]) &&
                    <fieldset
                        className={cn(
                            "grid gap-2",
                            activeFields["x"] && activeFields["y"] ? "grid-cols-2" : "grid-cols-1",
                        )}
                    >
                        {
                            activeFields["x"] &&
                            <HookFormInput
                                name="x" label="X Coordinate" type="number"
                                min={1} step={1} control={form.control}
                            />
                        }

                        {
                            activeFields["y"] &&
                            <HookFormInput
                                name="y" label="Y Coordinate" type="number"
                                min={1} step={1} control={form.control}
                            />
                        }
                    </fieldset>
                }

                {
                    activeFields["theatre"] &&
                    <TheatreHookFormSelect name="theatre" label="Theatre" control={form.control}/>
                }

                {
                    (activeFields["screen"] && theatre) &&
                    <ScreenHookFormSelect name="screen" label="Screen" filters={{theatre}} control={form.control}/>
                }

                <Button variant="default" type="submit" className="w-full" disabled={isPending || isSuccess}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
