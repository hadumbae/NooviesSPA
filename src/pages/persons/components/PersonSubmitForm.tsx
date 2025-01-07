import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import usePersonSubmitForm from "@/pages/persons/hooks/usePersonSubmitForm.ts";
import usePersonSubmitMutation from "@/pages/persons/hooks/usePersonSubmitMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {PersonSubmit} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import CountryHookFormCombobox from "@/common/components/forms/values/CountryHookFormCombobox.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import HookFormDatePicker from "@/common/components/forms/HookFormDatePicker.tsx";

interface Props {
    person?: Person;
    onSubmit: (person: Person) => void;
}

const PersonSubmitForm: FC<Props> = ({person, onSubmit}) => {
    const form = usePersonSubmitForm({person: person});
    const {mutate, isPending, isSuccess} = usePersonSubmitMutation({_id: person?._id, onSubmit, form});

    const onFormSubmit = (values: PersonSubmit) => {
        console.log("Person Submit Values: ", values);
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
                <HookFormInput
                    name="name"
                    label="Name"
                    description="The name of the person."
                    control={form.control}
                />

                <HookFormTextArea
                    name="biography"
                    label="Biography"
                    control={form.control}
                    description="The biography of the person."
                />

                <HookFormDatePicker
                    name="dob"
                    label="Date Of Birth"
                    mode="PAST"
                    control={form.control}
                />


                <CountryHookFormCombobox
                    form={form}
                    name="nationality"
                    label="Nationality"
                    description="The nationality of the person."
                />

                <Button
                    type="submit"
                    variant="default"
                    className="w-full"
                    disabled={isPending || isSuccess}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default PersonSubmitForm;
