import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ScreenSubmit} from "@/pages/screens/schema/ScreenSubmitSchema.ts";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import ScreenTypeHookFormSelect from "@/pages/screens/components/inputs/ScreenTypeHookFormSelect.tsx";

interface Props {
    className?: string;
    form: UseFormReturn<ScreenSubmit>;
    mutation: UseMutationResult<Screen, Error, ScreenSubmit>;
    onFormSubmit: SubmitHandler<ScreenSubmit>;
    options?: {
        hideTheatre?: boolean;
        disableTheatre?: boolean;
        hideScreenType?: boolean;
        disableScreenType?: boolean;
    }
}

const ScreenSubmitFormContainer: FC<Props> = ({form, mutation, onFormSubmit, className, options}) => {
    const {isPending} = mutation;

    const {hideTheatre, disableTheatre, hideScreenType, disableScreenType} = options || {};

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className={cn("space-y-4", className)}
            >
                <HookFormInput
                    name="name"
                    label="Name"
                    disabled={isPending}
                    control={form.control}
                />

                <HookFormInput
                    name="capacity"
                    label="Capacity"
                    disabled={isPending}
                    control={form.control}
                    type="number"
                    min={0}
                />

                {
                    !hideScreenType &&
                    <ScreenTypeHookFormSelect
                        control={form.control}
                        isDisabled={isPending || disableScreenType}
                        name="screenType"
                        label="Screen Type"
                    />
                }

                {
                    !hideTheatre &&
                    <TheatreHookFormSelect
                        control={form.control}
                        isDisabled={isPending || disableTheatre}
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

export default ScreenSubmitFormContainer;
