/**
 * @file ShowingSubmitFormLanguagesFieldset.tsx
 * @description
 * Fieldset component for managing all language-related inputs in the Showing submit form.
 *
 * This includes:
 * - The primary spoken **language** of the showing
 * - One or more **subtitle languages**
 *
 * It renders form fields conditionally based on the `activeFields` configuration,
 * allowing parent components to dynamically enable or disable specific inputs.
 *
 * The component uses `react-hook-form` for all controlled inputs.
 *
 * @module ShowingSubmitFormLanguagesFieldset
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for the `ShowingSubmitFormLanguagesFieldset` component.
 *
 * @property form - The React Hook Form instance that handles `ShowingFormValues`.
 * @property activeFields - A record that determines which form fields should be rendered.
 */
type FieldsetProps = {
    form: UseFormReturn<ShowingFormValues>;
    activeFields: Record<keyof ShowingFormValues, boolean>;
}

/**
 * A fieldset component for capturing language information for a Showing.
 *
 * It provides two main inputs:
 * - **Language** — the spoken language of the showing
 * - **Subtitle Languages** — optional subtitle languages (single or multiple depending on form design)
 *
 * Both fields are conditionally rendered depending on the `activeFields` flags supplied by the parent form.
 *
 * @param {FieldsetProps} props - Includes the form instance and the field activation map.
 * @returns {JSX.Element} A structured fieldset containing language-related form fields.
 *
 * @example Rendering all fields
 * ```tsx
 * <ShowingSubmitFormLanguagesFieldset
 *   form={form}
 *   activeFields={{
 *     language: true,
 *     subtitleLanguages: true,
 *     // other fields omitted
 *   }}
 * />
 * ```
 *
 * @example Rendering only primary language
 * ```tsx
 * <ShowingSubmitFormLanguagesFieldset
 *   form={form}
 *   activeFields={{
 *     language: true,
 *     subtitleLanguages: false
 *   }}
 * />
 * ```
 */
const ShowingSubmitFormLanguagesFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    return (
        <fieldset className="space-y-3">
            <div>
                <PrimaryHeaderText>Languages</PrimaryHeaderText>
                <Separator />
            </div>

            {/* Language */}
            {activeFields.language && (
                <LanguageHookFormSelect
                    name="language"
                    label="Language"
                    control={form.control}
                    isMulti={false}
                    description="The language in which the showing is available."
                />
            )}

            {/* Subtitles */}
            {activeFields.subtitleLanguages && (
                <LanguageHookFormSelect
                    name="subtitleLanguages"
                    label="Subtitles"
                    control={form.control}
                    isMulti={true}
                    description="Available subtitle languages."
                />
            )}
        </fieldset>
    );
};

export default ShowingSubmitFormLanguagesFieldset;
