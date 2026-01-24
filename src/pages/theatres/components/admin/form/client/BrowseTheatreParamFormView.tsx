import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParamFormValueSchema,
    BrowseTheatreParams
} from "@/pages/movies/schema/params/BrowseTheatreParams.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {cloneElement} from "react";

type FormProps =
    Pick<FormOptions<BrowseTheatreParamFormValues, BrowseTheatreParams>, "disableFields"> & {
    className?: string;
    form: UseFormReturn<BrowseTheatreParamFormValues>;
    submitHandler: SubmitHandler<BrowseTheatreParamFormValues>;
};

const BrowseTheatreParamFormView = (
    {disableFields, form, submitHandler, className}: FormProps
) => {
    useDebouncedFormAutoSubmit({form, submitHandler, timeout: 450});

    const activeFields = getActiveSchemaInputFields({
        schema: BrowseTheatreParamFormValueSchema,
        disableFields,
    });

    const fields: HookFormField[] = [
        {
            key: "city",
            render: activeFields["city"],
            element: <HookFormInput name="city" label="City" control={form.control}/>
        },
        {
            key: "state",
            render: activeFields["state"],
            element: <HookFormInput name="state" label="State" control={form.control}/>
        },
        {
            key: "country",
            render: activeFields["country"],
            element: <CountryHookFormSelect name="country" label="Country" control={form.control}/>
        },
        {
            key: "postalCode",
            render: activeFields["postalCode"],
            element: <HookFormInput name="postalCode" label="Postal Code" control={form.control}/>
        }
    ];

    const fieldsToRender = fields.map(
        ({key, element, render}) => render ? cloneElement(element, {key}) : null
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("grid grid-cols-2 gap-2", className)}
            >
                {fieldsToRender}
            </form>
        </Form>
    );
};

export default BrowseTheatreParamFormView;
