import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import {UseMutationResult} from "@tanstack/react-query";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreSubmitFormLocationInputs
    from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormLocationInputs.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

type TheatreSubmitFormViewProps = {
    form: UseFormReturn<TheatreFormValues>;
    submitHandler: SubmitHandler<TheatreFormValues>;
    mutation: UseMutationResult<Theatre, Error, TheatreForm>;
    disableFields?: (keyof TheatreFormValues)[];
    className?: string;
}

const TheatreSubmitFormView: FC<TheatreSubmitFormViewProps> = (params) => {
    const {form, submitHandler, mutation, disableFields, className} = params;
    const {isPending, isSuccess} = mutation;

    const activeFields = {
        name: !disableFields?.includes("name"),
        location: !disableFields?.includes("location"),
        seatCapacity: !disableFields?.includes("seatCapacity"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-8")}
            >

                <fieldset className="space-y-4">
                    <section>
                        <h1 className="text-lg font-bold">Theatre</h1>
                        <Separator/>
                    </section>

                    <section className={cn("grid grid-cols-1 gap-4", className)}>
                        {
                            activeFields["name"] &&
                            <HookFormInput name="name" label="Name" control={form.control}/>
                        }

                        {
                            activeFields["seatCapacity"] &&
                            <HookFormInput
                                name="seatCapacity"
                                label="Number Of Seats"
                                type="number"
                                min={0}
                                control={form.control}
                            />
                        }
                    </section>
                </fieldset>

                {
                    activeFields["location"] &&
                    <TheatreSubmitFormLocationInputs form={form}/>
                }


                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending || isSuccess}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default TheatreSubmitFormView;
