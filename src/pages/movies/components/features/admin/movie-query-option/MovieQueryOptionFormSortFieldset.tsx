/**
 * @file MovieQueryOptionFormSortFieldset.tsx
 * @description
 * A dynamic fieldset component that renders sort toggles for movie query options.
 * Each sort control is displayed only if enabled through the `activeFields` map.
 *
 * This component integrates with React Hook Form and uses `HookFormSortToggle`
 * to toggle between ascending, descending, or no sorting for each field.
 *
 * @example
 * ```tsx
 * const form = useForm<MovieQueryOptionFormValues>();
 *
 * <MovieQueryOptionFormSortFieldset
 *   form={form}
 *   activeFields={{
 *     sortByTitle: true,
 *     sortByOriginalTitle: true,
 *     sortByReleaseDate: true,
 *     sortByIsReleased: false,
 *     sortByIsAvailable: true,
 *     sortByCountry: false
 *   }}
 * />
 * ```
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";
import {UseFormReturn} from "react-hook-form";
import {MovieQueryOptionFormValues} from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";

/**
 * @typedef FieldsetProps
 * @description Props for the `MovieQueryOptionFormSortFieldset` component.
 *
 * @property {UseFormReturn<MovieQueryOptionFormValues>} form
 * The React Hook Form instance controlling the movie query form.
 *
 * @property {Record<keyof MovieQueryOptionFormValues, boolean>} activeFields
 * A configuration map enabling or disabling each sort option.
 * A sort toggle is rendered only when its corresponding key is set to `true`.
 */
type FieldsetProps = {
    form: UseFormReturn<MovieQueryOptionFormValues>;
    activeFields: Record<keyof MovieQueryOptionFormValues, boolean>;
};

/**
 * @component MovieQueryOptionFormSortFieldset
 * @description
 * Renders a set of sort toggles for movie query options.
 * Each toggle allows users to specify sorting direction (ascending/descending)
 * for fields like title, release date, availability, etc.
 *
 * The component is fully dynamic: only fields marked as active in `activeFields`
 * will be shown. This enables highly configurable sorting UIs across different
 * pages or contexts.
 *
 * @param {FieldsetProps} props - The form reference and activation map.
 * @returns {JSX.Element} A `<fieldset>` containing the relevant sort toggles.
 */
const MovieQueryOptionFormSortFieldset = (props: FieldsetProps) => {
    const {form, activeFields} = props;

    return (
        <fieldset className="space-y-4">
            <PrimaryHeaderText>Sorts</PrimaryHeaderText>

            <div className="flex flex-wrap">
                {activeFields["sortByReleaseDate"] && (
                    <HookFormSortToggle
                        name="sortByReleaseDate"
                        label="Release Date"
                        control={form.control}
                    />
                )}

                {activeFields["sortByTitle"] && (
                    <HookFormSortToggle
                        name="sortByTitle"
                        label="Title"
                        control={form.control}
                    />
                )}

                {activeFields["sortByOriginalTitle"] && (
                    <HookFormSortToggle
                        name="sortByOriginalTitle"
                        label="Original Title"
                        control={form.control}
                    />
                )}

                {activeFields["sortByIsReleased"] && (
                    <HookFormSortToggle
                        name="sortByIsReleased"
                        label="Is Released?"
                        control={form.control}
                    />
                )}

                {activeFields["sortByIsAvailable"] && (
                    <HookFormSortToggle
                        name="sortByIsAvailable"
                        label="Is Available?"
                        control={form.control}
                    />
                )}

                {activeFields["sortByCountry"] && (
                    <HookFormSortToggle
                        name="sortByCountry"
                        label="Country"
                        control={form.control}
                    />
                )}
            </div>
        </fieldset>
    );
};

export default MovieQueryOptionFormSortFieldset;
