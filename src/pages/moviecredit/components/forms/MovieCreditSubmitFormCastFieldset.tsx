import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {
    MovieCreditFormValues,
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {MovieCreditFormCastValues} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitCastSchema.ts";

interface FieldsetProps<TKey extends string = keyof MovieCreditFormCastValues> {
    form: UseFormReturn<MovieCreditFormValues>;
    className?: string;
    activeFields?: Partial<Record<TKey, boolean>>;
}

const MovieCreditSubmitFormCastFieldset: FC<FieldsetProps> = (params) => {
    const {form, className, activeFields = {characterName: true, billingOrder: true}} = params

    return (
        <fieldset className={cn("space-y-3", className)}>
            {
                activeFields["billingOrder"] &&
                <HookFormInput
                    name="billingOrder"
                    label="Billing Order"
                    control={form.control}
                    type="number"
                    min={1}
                    step={1}
                />
            }

            {
                activeFields["characterName"] &&
                <HookFormInput name="characterName" label="Character Name" control={form.control} type="text"/>
            }
        </fieldset>
    );
};

export default MovieCreditSubmitFormCastFieldset;
