import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {
    MovieCreditFormValues,
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCreditFormCrewValues} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitCrewSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

interface FieldsetProps<TKey extends string = keyof MovieCreditFormCrewValues> {
    form: UseFormReturn<MovieCreditFormValues>;
    className?: string;
    activeFields?: Partial<Record<TKey, boolean>>;
}

const MovieCreditSubmitFormCrewFieldset: FC<FieldsetProps> = ({form, className, activeFields = {job: true}}) => {
    return (
        <fieldset className={cn(className)}>
            {
                activeFields["job"] &&
                <HookFormInput name="job" label="Job" control={form.control} type="text"/>
            }
        </fieldset>
    );
};

export default MovieCreditSubmitFormCrewFieldset;
