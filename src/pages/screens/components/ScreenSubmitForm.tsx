import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import useScreenSubmitForm from "@/pages/screens/hooks/useScreenSubmitForm.ts";
import useScreenSubmitMutation from "@/pages/screens/hooks/useScreenSubmitMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ScreenSubmit} from "@/pages/screens/schema/ScreenSubmitSchema.ts";
import ScreenTypeHookFormCombobox from "@/pages/screens/components/ScreenTypeHookFormCombobox.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";

interface Props {
    className?: string;
    screen?: Screen;
    onSubmit: (screen: Screen) => void;
}

const ScreenSubmitForm: FC<Props> = ({className, screen, onSubmit}) => {
    const form = useScreenSubmitForm({screen});
    const {mutate, isPending, isSuccess} = useScreenSubmitMutation({form, onSubmit, _id: screen?._id});

    const onFormSubmit = (values: ScreenSubmit) => {
        console.log("Screen Submit Values: ", values);
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className={cn("space-y-4", className)}
            >
                <HookFormInput name="name" label="Name" control={form.control} />
                <HookFormInput name="capacity" label="Capacity" control={form.control} type="number" min={0} />
                <ScreenTypeHookFormCombobox form={form} name="screenType" label="Screen Type" />
                <TheatreHookFormSelect form={form} name="theatre" label="Theatre" />

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

export default ScreenSubmitForm;
