/**
 * @fileoverview Fieldset component for managing movie sorting options within a form.
 *
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";
import {MovieQueryOptionFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionFormValues";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieQueryOptionFormSortFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<MovieQueryOptionFormValues>, "isNestedView">;

/**
 * Renders a collection of sort toggles for movie query fields.
 */
export function MovieQueryOptionFormSortFieldset(
    {disableFields, className}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <PrimaryHeaderText>Sorts</PrimaryHeaderText>

            <div className={cn("flex flex-wrap", className)}>
                {!disableFields?.sortByReleaseDate && (
                    <HookFormSortToggle
                        name="sortByReleaseDate"
                        label="Release Date"
                        control={control}
                    />
                )}

                {!disableFields?.sortByTitle && (
                    <HookFormSortToggle
                        name="sortByTitle"
                        label="Title"
                        control={control}
                    />
                )}

                {!disableFields?.sortByOriginalTitle && (
                    <HookFormSortToggle
                        name="sortByOriginalTitle"
                        label="Original Title"
                        control={control}
                    />
                )}

                {!disableFields?.sortByIsReleased && (
                    <HookFormSortToggle
                        name="sortByIsReleased"
                        label="Is Released?"
                        control={control}
                    />
                )}

                {!disableFields?.sortByIsAvailable && (
                    <HookFormSortToggle
                        name="sortByIsAvailable"
                        label="Is Available?"
                        control={control}
                    />
                )}

                {!disableFields?.sortByCountry && (
                    <HookFormSortToggle
                        name="sortByCountry"
                        label="Country"
                        control={control}
                    />
                )}
            </div>
        </fieldset>
    );
}
