import {FC} from 'react';
import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
import useTheatreSubmitMutation from "@/pages/theatres/hooks/mutations/useTheatreSubmitMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";

interface Props {
    className?: string;
    theatre?: TheatreDetails;
    onSubmit: (theatre: TheatreDetails) => void;
}

const TheatreSubmitForm: FC<Props> = ({theatre, onSubmit, className}) => {
    const form = useTheatreSubmitForm({theatre});
    const {mutate, isPending, isSuccess} = useTheatreSubmitMutation({form, onSubmit, _id: theatre?._id});

    const onFormSubmit = (values: TheatreForm) => {
        console.log("Theatre Create Values : ", values);
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className={cn("space-y-4", className)}
            >
                <HookFormInput name="name" label="Name" control={form.control} />

                <HookFormInput name="location" label="Location" control={form.control} />

                <HookFormInput
                    name="seatCapacity"
                    label="Number Of Seats"
                    type="number"
                    min={0}
                    control={form.control}
                />

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

export default TheatreSubmitForm;
