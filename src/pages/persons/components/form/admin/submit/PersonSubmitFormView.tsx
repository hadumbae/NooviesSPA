import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {cn} from "@/common/lib/utils.ts";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm} from "@/pages/persons/schema/forms/PersonForm.types.ts";

interface Props {
    form: UseFormReturn<PersonForm>;
    submitHandler: SubmitHandler<PersonForm>;
    mutation: UseMutationResult<Person, Error, PersonForm>;
    disableFields?: (keyof PersonForm)[]
    className?: string
}

const PersonSubmitFormView: FC<Props> = ({form, submitHandler, mutation, className, disableFields = []}) => {
    const {isPending} = mutation;

    const activeFields = {
        name: !disableFields.includes("name"),
        biography: !disableFields.includes("biography"),
        dob: !disableFields.includes("dob"),
        nationality: !disableFields.includes("nationality"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
                {
                    activeFields["name"]
                    && <HookFormInput
                        name="name"
                        label="Name"
                        description="The name of the person."
                        control={form.control}
                    />
                }

                {
                    activeFields["biography"]
                    && <HookFormTextArea
                        name="biography"
                        label="Biography"
                        control={form.control}
                        description="The biography of the person."
                    />
                }

                {
                    activeFields["dob"]
                    && <HookFormInput
                        name="dob"
                        label="Date Of Birth"
                        control={form.control}
                        type="date"
                        description="The Date of Birth of the person."
                    />
                }

                {
                    activeFields["nationality"]
                    && <CountryHookFormSelect
                        name="nationality"
                        label="Nationality"
                        control={form.control}
                        isMulti={false}
                        description="The nationality of the person."
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

export default PersonSubmitFormView;
