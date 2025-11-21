/**
 * @file ShowingSubmitFormDetailsFieldset.tsx
 * @description
 * A fieldset component used inside the Showing submit form.
 * It handles selection of movie, theatre, screen, and an optional set of theatre filters
 * (country, state, city).
 *
 * The component integrates closely with React Hook Form (`UseFormReturn<ShowingFormValues>`)
 * and dynamically shows or hides fields depending on both:
 * - `activeFields`: external configuration indicating which fields should be shown.
 * - `isFilterOpen`: local state determining whether theatre filters are applied.
 *
 * It also synchronizes filter values and theatre/screen values through `useEffect`,
 * enforcing mutual exclusivity between:
 * - Theatre filters
 * - Direct theatre/screen selection
 *
 * @module ShowingSubmitFormDetailsFieldset
 */

import {FC, useEffect, useState} from 'react';
import MovieHookFormSelect from "@/pages/movies/components/ui/MovieHookFormSelect.tsx";
import MovieQuickOverviewFetchCard from "@/pages/movies/components/admin/movie-details/MovieQuickOverviewFetchCard.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import TheatreQuickOverviewFetchCard
    from "@/pages/theatres/components/admin/theatre-details/TheatreQuickOverviewFetchCard.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import {UseFormReturn} from "react-hook-form";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import filterFalsyAttributes from "@/common/utility/collections/filterFalsyAttributes.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {Plus, X} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Props for the `ShowingSubmitFormDetailsFieldset` component.
 *
 * @property form - The React Hook Form instance handling `ShowingFormValues`.
 * @property activeFields - A record indicating which fields in the form should be rendered.
 */
type FieldsetProps = {
    form: UseFormReturn<ShowingFormValues>;
    activeFields: Record<keyof ShowingFormValues, boolean>;
};

/**
 * A fieldset component containing all detail-related inputs for creating or editing
 * a Showing entity.
 *
 * This includes:
 * - Movie selection with overview card
 * - Optional theatre filters (country, state, city)
 * - Theatre selection with overview card
 * - Screen selection (conditional on theatre)
 *
 * The component ensures filter-based selection and direct theatre selection are mutually exclusive:
 * - Closing the filter panel clears filter fields.
 * - Changing filter fields clears theatre and screen selections.
 *
 * @param {FieldsetProps} props - Contains the form instance and active field controls.
 * @returns {JSX.Element} A fully controlled fieldset for entering showing details.
 *
 * @example Basic usage
 * ```tsx
 * <ShowingSubmitFormDetailsFieldset
 *   form={form}
 *   activeFields={{
 *     movie: true,
 *     theatre: true,
 *     screen: true,
 *     theatreCity: true,
 *     theatreState: true,
 *     theatreCountry: true
 *   }}
 * />
 * ```
 *
 * @example Rendering with filtered fields disabled
 * ```tsx
 * <ShowingSubmitFormDetailsFieldset
 *   form={form}
 *   activeFields={{
 *     movie: true,
 *     theatre: true,
 *     screen: true,
 *     theatreCity: false,
 *     theatreState: false,
 *     theatreCountry: false
 *   }}
 * />
 * ```
 */
const ShowingSubmitFormDetailsFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    // ⚡ Watch Form ⚡
    const movie = form.watch("movie");
    const theatre = form.watch("theatre");
    const city = form.watch("theatreCity");
    const state = form.watch("theatreState");
    const country = form.watch("theatreCountry");

    // Clear theatre filters when the collapsible closes
    useEffect(() => {
        if (!isFilterOpen) {
            form.setValue("theatreCity", "");
            form.setValue("theatreState", "");
            form.setValue("theatreCountry", undefined);
        }
    }, [isFilterOpen]);

    // When filters are changed, clear theatre and screen selections
    useEffect(() => {
        if (isFilterOpen) {
            form.setValue("theatre", undefined);
            form.setValue("screen", undefined);
        }
    }, [city, state, country]);

    // When the theatre is changed, clear the screen selection
    useEffect(() => {
        form.resetField("screen");
    }, [theatre]);

    const theatreFilters = filterFalsyAttributes({city, state, country});

    return (
        <fieldset className="space-y-2">
            <div>
                <PrimaryHeaderText>Details</PrimaryHeaderText>
                <Separator/>
            </div>

            {/* Movie */}
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

            {/* Theatre Filter */}
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

            {/* Theatre */}
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

            {/* Screen */}
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
};

export default ShowingSubmitFormDetailsFieldset;
