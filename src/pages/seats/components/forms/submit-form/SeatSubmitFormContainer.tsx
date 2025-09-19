import {FC, useEffect, useRef} from 'react';

import useSeatSubmitForm from "@/pages/seats/hooks/forms/useSeatSubmitForm.ts";
import useSeatSubmitMutation, {
    SeatSubmitMutationFormParams
} from "@/pages/seats/hooks/mutations/useSeatSubmitMutation.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatSubmitFormView from "@/pages/seats/components/forms/submit-form/SeatSubmitFormView.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

type FormProps =
    Omit<FormMutationOnSubmitParams<Seat>, "onSubmitSuccess"> &
    (| { isEditing: true, seat: Seat } | { isEditing?: false, seat?: never }) &
    {
        className?: string;
        presetValues?: Partial<SeatFormValues>;
        disableFields?: (keyof SeatFormValues)[];
        onSubmitSuccess?: (seat: Seat) => void;
    };

const SeatSubmitFormContainer: FC<FormProps> = (params) => {
    const {className, isEditing, seat, presetValues, disableFields, ...formOptions} = params;

    const form = useSeatSubmitForm({seat, presetValues});

    const mutationParams: SeatSubmitMutationFormParams = isEditing
        ? {isEditing: true, form, _id: seat._id, ...formOptions}
        : {isEditing: false, form, ...formOptions};

    const mutation = useSeatSubmitMutation(mutationParams);

    const theatre = form.watch("theatre");
    const isFirstRender = useRef<boolean>(false);
    const isSecondRender = useRef<boolean>(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (isSecondRender.current) {
            isSecondRender.current = false;
            return;
        }

        form.resetField("screen");
    }, [theatre]);

    const onFormSubmit = (values: SeatFormValues) => {
        console.log("Seat Submit Values: ", values);
        mutation.mutate(values as SeatForm);
    }

    return (
        <SeatSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            disableFields={disableFields}
        />
    );
};

export default SeatSubmitFormContainer;
