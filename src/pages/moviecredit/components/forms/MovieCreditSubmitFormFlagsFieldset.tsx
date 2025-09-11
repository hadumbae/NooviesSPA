import {FC} from 'react';
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import {UseFormReturn} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {
    MovieCreditFormValues,
} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitSchema.ts";
import {MovieCreditFormBaseValues} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitBaseSchema.ts";

interface FlagsProps<TKey extends string = keyof MovieCreditFormBaseValues> {
    form: UseFormReturn<MovieCreditFormValues>;
    className?: string;
    activeFields: Partial<Record<TKey, boolean>>;
}

const MovieCreditSubmitFormFlagsFieldset: FC<FlagsProps> = (params) => {
    const {
        form,
        className,
        activeFields = {uncredited: true, voiceOnly: true, cameo: true, motionCapture: true},
    } = params

    return (
        <fieldset className={cn(className)}>
            {
                activeFields["uncredited"] &&
                <HookFormCheckbox name="uncredited" label="Is Uncredited?" control={form.control}/>
            }

            {
                activeFields["voiceOnly"] &&
                <HookFormCheckbox name="voiceOnly" label="Is Voice Only?" control={form.control}/>
            }

            {
                activeFields["cameo"] &&
                <HookFormCheckbox name="cameo" label="Is Cameo?" control={form.control}/>
            }

            {
                activeFields["motionCapture"] &&
                <HookFormCheckbox name="motionCapture" label="Is Motion Captured?" control={form.control}/>
            }
        </fieldset>
    );
};

export default MovieCreditSubmitFormFlagsFieldset;
