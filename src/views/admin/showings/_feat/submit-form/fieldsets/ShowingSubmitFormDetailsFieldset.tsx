/**
 * @fileoverview Fieldset for managing movie, theatre, and screen selection in a showing submission form.
 */

import {ReactElement, useContext, useEffect, useState} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {CountryHookFormSelect} from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import filterFalsyAttributes from "@/common/utility/collections/filterFalsyAttributes.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {Plus, X} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {MultiStepFormStateContext} from "@/common/_feat/multi-step-form/contexts/stateContext.ts";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat/form-input/selects/TheatreHookFormSelect.tsx";
import {ScreenHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {TheatreQuickOverviewFetchCard} from "@/views/admin/theatres/_comp/display-cards";
import {MovieHookFormSelect} from "@/views/admin/movies/_feat/form-inputs";
import {MovieQuickOverviewFetchCard} from "@/views/admin/movies/_comp/form-display";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {Theatre} from "@/domains/theatres/schema/theatre";

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
                <PrimaryHeaderText>Details</PrimaryHeaderText>
                <Separator/>
            </div>

            {
                !disableFields?.movie && (
                    <div className="space-y-1">
                        <MovieHookFormSelect
                            control={control}
                            name="movie"
                            label="Movie"
                            description="The movie to be shown."
                        />
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
                                <CountryHookFormSelect
                                    name="theatreCountry"
                                    label="Country"
                                    control={control}
                                    className="col-span-2"
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
                            control={control}
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
