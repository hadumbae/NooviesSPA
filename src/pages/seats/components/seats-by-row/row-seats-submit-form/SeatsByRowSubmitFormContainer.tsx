import {FC} from 'react';
import useSeatsByRowSubmitForm from "@/pages/seats/hooks/submit-seats-by-row/useSeatsByRowSubmitForm.ts";
import useSeatsByRowSubmitMutation from "@/pages/seats/hooks/submit-seats-by-row/useSeatsByRowSubmitMutation.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import SeatsByRowSubmitFormView from "@/pages/seats/components/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormView.tsx";
import {SeatsByRowForm, SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

type FormContainerProps = FormMutationOnSubmitParams<unknown> & {
    presetValues?: Partial<SeatsByRowFormValues>;
    disableFields?: (keyof SeatsByRowFormValues)[];
    className?: string;
}

const SeatsByRowSubmitFormContainer: FC<FormContainerProps> = (params) => {
    const {presetValues, disableFields, className, ...options} = params;

    const form = useSeatsByRowSubmitForm({presetValues});
    const mutation = useSeatsByRowSubmitMutation({form, ...options});

    const onFormSubmit = (values: SeatsByRowFormValues) => {
        console.log("[Seats By Row] Form Values: ", values);
        mutation.mutate(values as SeatsByRowForm);
    }

    return (
        <SeatsByRowSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default SeatsByRowSubmitFormContainer;
