/**
 * @fileoverview Fieldset for managing movie, theatre, and screen selection in a showing submission form.
 */

import {ReactElement, useContext, useEffect, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {Plus, X} from "lucide-react";
import {ObjectId} from "@/common/_schemas";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {
    filterFalsyAttributes
} from "@/common/_feat/filter-object-attributes/filterFalsyAttributes.ts";
import {MultiStepFormStateContext} from "@/common/_feat/multi-step-form/contexts/stateContext.ts";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";

import {HookFormInput} from "@/views/common/_feat";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Separator} from "@/common/components/ui";
import {MovieHookFormSelect, MovieQuickOverviewFetchCard} from "@/views/admin/movies";
import {TheatreHookFormSelect, TheatreQuickOverviewFetchCard} from "@/views/admin/theatres";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens";

import {Theatre} from "@/domains/theatres";
import {ShowingFormValues} from "@/domains/showings";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";

/**
 * Form fieldset for selecting the movie and location details for a showing.
 */
export function ShowingSubmitFormDetailsFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control, watch, setValue, resetField} = useFormContext();

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const {isHydrated = true} = useContext(MultiStepFormStateContext) ?? {};

    // --- WATCH ---

    const movie = watch("movie");
    const theatre = watch("theatre");
    const city = watch("theatreCity");
    const state = watch("theatreState");
    const country = watch("theatreCountry");

    const theatreFilters = filterFalsyAttributes({city, state, country});
    const onTheatreChange = (val: Theatre | null) => setValue("localTimezone", val?.location.timezone ?? "");

    // --- HOOKS ---

    /** Effect: Reset location filters when the filter panel is closed. */
    useEffect(() => {
        if (!isFilterOpen) {
            setValue("theatreCity", "");
            setValue("theatreState", "");
            setValue("theatreCountry", undefined);
        }
    }, [isFilterOpen]);

    /** Effect: Clear selection when location filters are modified. */
    useEffect(() => {
        if (isFilterOpen) {
            setValue("theatre", undefined);
            setValue("screen", undefined);
            setValue("localTimezone", "");
        }
    }, [city, state, country]);

    /** Effect: Reset screen selection whenever the selected theatre changes. */
    useEffect(() => {
        if (isHydrated) {
            resetField("screen");
        }
    }, [theatre]);

    // --- RENDER ---

    return (
        <fieldset className={cn("space-y-2", className)}>
            <div>
                <h3 className="fieldset-header">Details</h3>
                <Separator/>
            </div>

            {
                !disableFields?.movie && (
                    <div className="space-y-1">
                        <MovieHookFormSelect name="movie" label="Movie" description="The movie to be shown."/>
                        {movie && <MovieQuickOverviewFetchCard movieID={movie as ObjectId}/>}
                    </div>
                )
            }

            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="link" size="sm">
                        {isFilterOpen ? <X/> : <Plus/>}
                        {isFilterOpen ? "Clear Filters" : "Add Theatre Filters"}
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-3 rounded-2xl border border-neutral-800 dark:border-neutral-500">
                    <div className="grid grid-cols-2 gap-1">
                        {
                            !disableFields?.theatreCountry && (
                                <HookFormSelect
                                    name="theatreCountry"
                                    label="Country"
                                    classNames={{container: "col-span-2"}}
                                    options={ISO3166Alpha2CountryOptions}
                                />
                            )
                        }

                        {
                            !disableFields?.theatreCity && (
                                <HookFormInput
                                    name="theatreCity"
                                    label="City"
                                    control={control}
                                />
                            )
                        }

                        {
                            !disableFields?.theatreState && (
                                <HookFormInput
                                    name="theatreState"
                                    label="State"
                                    control={control}
                                />
                            )
                        }
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {
                !disableFields?.theatre && (
                    <div>
                        <TheatreHookFormSelect
                            name="theatre"
                            label="Theatre"
                            description="The theatre at which the showing will be."
                            filters={theatreFilters}
                            onValueChange={onTheatreChange}
                        />

                        {theatre && (
                            <TheatreQuickOverviewFetchCard theatreID={theatre as ObjectId}/>
                        )}
                    </div>
                )
            }

            {
                !disableFields?.screen && theatre && (
                    <ScreenHookFormSelect
                        control={control}
                        name="screen"
                        label="Screen"
                        filters={{theatre}}
                        description="The screen on which the movie will be shown."
                    />
                )
            }
        </fieldset>
    );
}
