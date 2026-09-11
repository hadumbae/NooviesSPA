/**
 * @fileoverview Fieldset for managing movie, theatre, and screen selection in a showing submission form.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {Plus, X} from "lucide-react";
import {ObjectId} from "@/common/_schemas";
import {cn, createFormFieldConfig, renderFields, useBaseMultiStepFormContext} from "@/common/_feat";
import {filterFalsyAttributes} from "@/common/_feat/filter-object-attributes/filterFalsyAttributes.ts";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";

import {HookFormInput} from "@/views/common/_feat";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Separator} from "@/views/common/_comp/ui";
import {MovieHookFormSelect} from "@/views/admin/movies/_feat/form-inputs/MovieHookFormSelect.tsx";
import {MovieQuickOverviewFetchCard} from "@/views/admin/movies/_comp/form-display/MovieQuickOverviewFetchCard.tsx";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat/form-input/selects/TheatreHookFormSelect.tsx";
import {TheatreQuickOverviewFetchCard} from "@/views/admin/theatres/_comp/display-cards/TheatreQuickOverviewFetchCard.tsx";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens";

import {Theatre} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";
import {ShowingFormValues} from "@/domains/showings/_schema/form/form-values/ShowingFormValues.ts";
import {useHandleShowingFormFiltering} from "@/domains/showings/_feat/submit-data/useHandleShowingFormFiltering.ts";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Form fieldset for selecting the movie and location details for a showing.
 */
export function ShowingSubmitFormDetailsFieldset(
    {disableFields, hideFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control, watch, setValue} = useFormContext();
    const {isPending} = useBaseMultiStepFormContext();

    const movie = watch("movie");
    const theatre = watch("theatre");
    const city = watch("theatreCity");
    const state = watch("theatreState");
    const country = watch("theatreCountry");

    const {isFiltering, setIsFiltering} = useHandleShowingFormFiltering();
    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const theatreFilters = filterFalsyAttributes({city, state, country});
    const onTheatreChange = (val: Theatre | null) => setValue("timezone", val?.location.timezone ?? "");

    const filterFields: ConditionalRenderConfig[] = [
        field({
            key: "theatreCountry",
            element: <HookFormSelect
                name="theatreCountry"
                label="Country"
                classNames={{container: "col-span-2"}}
                options={ISO3166Alpha2CountryOptions}
            />
        }),
        field({
            key: "theatreCity",
            element: <HookFormInput
                name="theatreCity"
                label="City"
                control={control}
            />
        }),
        field({
            key: "theatreState",
            element: <HookFormInput
                name="theatreState"
                label="State"
                control={control}
            />
        }),
    ];

    const detailsFields: ConditionalRenderConfig[] = [
        field({
            key: "movie",
            element: <div className="space-y-1">
                <MovieHookFormSelect name="movie" label="Movie" description="The movie to be shown."/>
                {movie && <MovieQuickOverviewFetchCard movieID={movie as ObjectId}/>}
            </div>
        }),
        field({
            key: "theatre",
            element: <div>
                <TheatreHookFormSelect
                    name="theatre"
                    label="Theatre"
                    description="The theatre at which the showing will be."
                    filters={theatreFilters}
                    onValueChange={onTheatreChange}
                />

                {theatre && <TheatreQuickOverviewFetchCard theatreID={theatre as ObjectId}/>}
            </div>
        }),
        {
            key: "screen",
            render: !hideFields?.screen && theatre,
            disabled: disableFields?.screen,
            element: <ScreenHookFormSelect
                control={control}
                name="screen"
                label="Screen"
                filters={{theatre}}
                description="The screen on which the movie will be shown."
            />
        },
    ]

    return (
        <fieldset className={cn("space-y-2", className)}>
            <div>
                <h3 className="fieldset-header">Details</h3>
                <Separator/>
            </div>

            {renderFields({fields: detailsFields.slice(0, 1)})}

            <Collapsible open={isFiltering} onOpenChange={setIsFiltering}>
                <CollapsibleTrigger asChild>
                    <Button variant="link" size="sm">
                        {isFiltering ? <X/> : <Plus/>}
                        {isFiltering ? "Clear Filters" : "Add Theatre Filters"}
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-3 rounded-2xl border border-neutral-800 dark:border-neutral-500">
                    <div className="grid grid-cols-2 gap-1">
                        {renderFields({fields: filterFields})}
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {renderFields({fields: detailsFields.slice(1)})}
        </fieldset>
    );
}
