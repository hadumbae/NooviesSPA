import {
    ShowingFormDetailValuesSchema
} from "@/domains/showings/schema/form/form-values/ShowingFormDetailValuesSchema.ts";
import {
    ShowingFormLanguageValuesSchema
} from "@/domains/showings/schema/form/form-values/ShowingFormLanguageValuesSchema.ts";
import {
    ShowingFormDateTimeValuesSchema
} from "@/domains/showings/schema/form/form-values/ShowingFormDateTimeValuesSchema.ts";
import {
    ShowingFormStatusValuesSchema
} from "@/domains/showings/schema/form/form-values/ShowingFormStatusValuesSchema.ts";

/**
 * @deprecated Remove ShowingFormSchema.
 */
export const ShowingFormValuesSchema = ShowingFormDetailValuesSchema
    .merge(ShowingFormLanguageValuesSchema)
    .merge(ShowingFormDateTimeValuesSchema)
    .merge(ShowingFormStatusValuesSchema);

