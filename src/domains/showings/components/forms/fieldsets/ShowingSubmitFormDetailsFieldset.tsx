/**
 * @fileoverview Fieldset component for the Showing submission form.
 * Manages the selection and validation of movie, theatre, and screen entities.
 */

import {ReactElement, useContext, useEffect, useState} from 'react';
import MovieHookFormSelect from "@/domains/movies/components/ui/MovieHookFormSelect.tsx";
import MovieQuickOverviewFetchCard
    from "@/domains/movies/components/admin/movie-details/MovieQuickOverviewFetchCard.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreQuickOverviewFetchCard
    from "@/domains/theatres/components/admin/theatre-details/TheatreQuickOverviewFetchCard.tsx";
import {UseFormReturn} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import filterFalsyAttributes from "@/common/utility/collections/filterFalsyAttributes.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {Plus, X} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {MultiStepFormContext} from "@/common/context/multi-step-form/MultiStepFormContext.ts";
import TheatreHookFormSelect from "@/domains/theatres/components/admin/form/theatre-inputs/TheatreHookFormSelect.tsx";
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormValuesSchema.ts";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";

/** Props for the ShowingSubmitFormDetailsFieldset component. */
type FieldsetProps = {
    form: UseFormReturn<ShowingFormValues>;
    activeFields: Record<keyof ShowingFormValues, boolean>;
};

/**
 * A fieldset component handling movie, theatre, and screen selection with dynamic filtering.
 */
export function ShowingSubmitFormDetailsFieldset(
    {form, activeFields}: FieldsetProps
): ReactElement {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const {isHydrated = true} = useContext(MultiStepFormContext) ?? {};

    const movie = form.watch("movie");
    const theatre = form.watch("theatre");
    const city = form.watch("theatreCity");
    const state = form.watch("theatreState");
    const country = form.watch("theatreCountry");

    /** Effect: Reset location filters when the filter panel is closed. */
    useEffect(() => {
        if (!isFilterOpen) {
            form.setValue("theatreCity", "");
            form.setValue("theatreState", "");
            form.setValue("theatreCountry", undefined);
        }
    }, [isFilterOpen]);

    /** Effect: Clear selection when location filters are modified. */
    useEffect(() => {
        if (isFilterOpen) {
            form.setValue("theatre", undefined);
            form.setValue("screen", undefined);
        }
    }, [city, state, country]);

    /** Effect: Reset screen selection whenever the selected theatre changes. */
    useEffect(() => {
        if (isHydrated) {
            form.resetField("screen");
        }
    }, [theatre]);

    const theatreFilters = filterFalsyAttributes({city, state, country});

    return (
        <fieldset className="space-y-2">
            <div>
                <PrimaryHeaderText>Details</PrimaryHeaderText>
                <Separator/>
            </div>

            {/* Movie Selection */}
            {activeFields.movie && (
                <div className="space-y-1">
                    <MovieHookFormSelect
                        control={form.control}
                        name="movie"
                        label="Movie"
                        description="The movie to be shown."
                    />
                    {movie && <MovieQuickOverviewFetchCard movieID={movie as ObjectId}/>}
                </div>
            )}

            {/* Theatre Filters (Collapsible) */}
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="link" size="sm">
                        {isFilterOpen ? <X/> : <Plus/>}
                        {isFilterOpen ? "Clear Filters" : "Add Theatre Filters"}
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-3 rounded-2xl border border-neutral-800 dark:border-neutral-500">
                    <div className="grid grid-cols-2 gap-1">
                        {activeFields["theatreCountry"] && (
                            <CountryHookFormSelect
                                name="theatreCountry"
                                label="Country"
                                control={form.control}
                                className="col-span-2"
                            />
                        )}

                        {activeFields["theatreCity"] && (
                            <HookFormInput
                                name="theatreCity"
                                label="City"
                                control={form.control}
                            />
                        )}

                        {activeFields["theatreState"] && (
                            <HookFormInput
                                name="theatreState"
                                label="State"
                                control={form.control}
                            />
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {/* Theatre Selection */}
            {activeFields.theatre && (
                <div>
                    <TheatreHookFormSelect
                        control={form.control}
                        name="theatre"
                        label="Theatre"
                        description="The theatre at which the showing will be."
                        filters={theatreFilters}
                    />

                    {theatre && (
                        <TheatreQuickOverviewFetchCard theatreID={theatre as ObjectId}/>
                    )}
                </div>
            )}

            {/* Screen Selection (Conditional on Theatre) */}
            {activeFields.screen && theatre && (
                <ScreenHookFormSelect
                    control={form.control}
                    name="screen"
                    label="Screen"
                    filters={{theatre}}
                    description="The screen on which the movie will be shown."
                />
            )}
        </fieldset>
    );
}