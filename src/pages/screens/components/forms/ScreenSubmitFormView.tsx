import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import ScreenTypeHookFormSelect from "@/pages/screens/components/inputs/ScreenTypeHookFormSelect.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";

interface Props {
    className?: string;
    form: UseFormReturn<ScreenFormValues>;
    mutation: UseMutationResult<Screen, Error, ScreenForm>;
    submitHandler: SubmitHandler<ScreenFormValues>;
    disableFields?: (keyof ScreenFormValues)[];
}

const ScreenSubmitFormView: FC<Props> = (params) => {
    const {form, mutation, submitHandler, className, disableFields = []} = params;

    const {isPending} = mutation;

    const activeFields = {
        name: !disableFields.includes("name"),
        capacity: !disableFields.includes("capacity"),
        screenType: !disableFields.includes("screenType"),
        theatre: !disableFields.includes("theatre"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {
                    activeFields["name"] &&
                    <HookFormInput
                        name="name"
                        label="Name"
                        disabled={isPending}
                        control={form.control}
                    />
                }

                {
                    activeFields["capacity"] &&
                    <HookFormInput
                        name="capacity"
                        label="Capacity"
                        disabled={isPending}
                        control={form.control}
                        type="number"
                        min={0}
                    />
                }

                {
                    activeFields["screenType"] &&
                    <ScreenTypeHookFormSelect
                        control={form.control}
                        isDisabled={isPending}
                        name="screenType"
                        label="Screen Type"
                    />
                }

                {
                    activeFields["theatre"] &&
                    <TheatreHookFormSelect
                        control={form.control}
                        isDisabled={isPending}
                        name="theatre"
                        label="Theatre"
                    />
                }

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default ScreenSubmitFormView;
