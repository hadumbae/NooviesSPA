/**
 * @file MovieCreditSubmitFormView.tsx
 *
 * Presentational form for creating or editing a movie credit.
 */

import {UseMutationResult} from "@tanstack/react-query";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {RefreshCw} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

import generateReactSelectOptions from "@/common/utility/inputs/generateReactSelectOptions.ts";

import RoleTypeDepartmentRadioGroup from "@/pages/roletype/components/inputs/RoleTypeDepartmentRadioGroup.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";

import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {
    MovieCreditForm,
    MovieCreditFormCastValues,
    MovieCreditFormValues
} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {HeaderTextCSS} from "@/common/constants/css/TextCSS.ts";
import {PrimaryButtonCSS, SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";

interface ViewProps {
    /** React Hook Form controller */
    form: UseFormReturn<MovieCreditFormValues>;

    /** Submit handler passed to RHF */
    submitHandler: SubmitHandler<MovieCreditFormValues>;

    /** React Query mutation for submission */
    mutation: UseMutationResult<MovieCreditDetails, unknown, MovieCreditForm>;

    /** Available movie options */
    movies: Movie[];

    /** Available person options */
    persons: Person[];

    /** Available role type options */
    roleTypes: RoleType[];

    /** Fields to disable or hide */
    disableFields?: (keyof MovieCreditFormValues)[];
}

/**
 * Movie credit submission form.
 *
 * Features:
 * - CAST / CREW conditional rendering
 * - Field-level enable/disable control
 * - Fully controlled via React Hook Form
 * - Async submission with React Query
 *
 * @remarks
 * - Select options are generated via {@link generateReactSelectOptions}
 * - Reset button clears all form values
 */
const MovieCreditSubmitFormView = (params : ViewProps) => {
    const {form, submitHandler, mutation, persons, movies, roleTypes, disableFields = []} = params;

    const {isPending} = mutation;
    const reset = () => form.reset();
    const department = form.watch("department");

    const movieOptions = generateReactSelectOptions({data: movies, labelKey: "title", valueKey: "_id"});
    const personOptions = generateReactSelectOptions({data: persons, labelKey: "name", valueKey: "_id"});
    const roleTypeOptions = generateReactSelectOptions({data: roleTypes, labelKey: "roleName", valueKey: "_id"});

    const activeFields = {
        department: !disableFields.includes("department"),
        movie: !disableFields.includes("movie"),
        person: !disableFields.includes("person"),
        notes: !disableFields.includes("person"),
        uncredited: !disableFields.includes("uncredited"),
        roleType: !disableFields.includes("roleType"),
        displayRoleName: !disableFields.includes("displayRoleName"),
        creditedAs: !disableFields?.includes("creditedAs"),
    };

    const activeCastFields: Partial<Record<keyof MovieCreditFormCastValues, boolean>> = {
        characterName: !disableFields.includes("characterName"),
        billingOrder: !disableFields.includes("billingOrder"),
        voiceOnly: !disableFields.includes("voiceOnly"),
        cameo: !disableFields.includes("cameo"),
        motionCapture: !disableFields.includes("motionCapture"),
        isPrimary: !disableFields?.includes("isPrimary"),
        uncredited: !disableFields?.includes("uncredited"),
        archiveFootage: !disableFields?.includes("archiveFootage"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5")}>
                <fieldset className="space-y-3">
                    <h1 className={HeaderTextCSS}>Basic Details</h1>

                    {
                        activeFields["department"] &&
                        <RoleTypeDepartmentRadioGroup
                            form={form}
                            name="department"
                            label="Department"
                            className="flex flex-row justify-start space-x-5"
                        />
                    }

                    {
                        activeFields["movie"] &&
                        <HookFormSelect
                            name="movie"
                            label="Movie"
                            control={form.control}
                            options={movieOptions}
                        />
                    }

                    {
                        activeFields["person"] &&
                        <HookFormSelect
                            name="person"
                            label="Person"
                            control={form.control}
                            options={personOptions}
                        />
                    }

                    {
                        activeFields["roleType"] &&
                        <HookFormSelect
                            name="roleType"
                            label="Role Type"
                            control={form.control}
                            options={roleTypeOptions}
                        />
                    }

                    {
                        activeFields["displayRoleName"] &&
                        <HookFormInput
                            name="displayRoleName"
                            label="Display (Role Name)"
                            control={form.control}
                            type="text"
                            description="The name to display in lieu of the role's name."
                        />
                    }

                    {
                        activeFields["creditedAs"] &&
                        <HookFormInput
                            name="creditedAs"
                            label="Credited As"
                            control={form.control}
                            type="text"
                            description="Name in credits."
                        />
                    }
                </fieldset>

                <Separator/>

                {
                    department === "CAST" && <>
                        <fieldset className="space-y-3">
                            <h1 className={HeaderTextCSS}>Credits Info</h1>

                            {
                                activeCastFields["billingOrder"] &&
                                <HookFormInput
                                    name="billingOrder"
                                    label="Billing Order"
                                    control={form.control}
                                    type="number"
                                    min={1}
                                    step={1}
                                    description="Order of credits."
                                />
                            }

                            {
                                activeCastFields["characterName"] &&
                                <HookFormInput
                                    name="characterName"
                                    label="Character Name"
                                    control={form.control}
                                    type="text"
                                    description="The name of the character played."
                                />
                            }
                        </fieldset>
                        <Separator/>
                    </>
                }


                {
                    department === "CAST" && <>
                        <fieldset className="space-y-3">
                            <h1 className={HeaderTextCSS}>Flags</h1>

                            <section className="grid grid-cols-2 gap-2">
                                {
                                    activeCastFields["isPrimary"] &&
                                    <HookFormCheckbox name="isPrimary" label="Is Primary?" control={form.control}/>
                                }

                                {
                                    activeCastFields["uncredited"] &&
                                    <HookFormCheckbox name="uncredited" label="Is Uncredited?" control={form.control}/>
                                }

                                {
                                    activeCastFields["cameo"] &&
                                    <HookFormCheckbox name="cameo" label="Is Cameo?" control={form.control}/>
                                }

                                {
                                    activeCastFields["archiveFootage"] &&
                                    <HookFormCheckbox name="archiveFootage" label="Is Archive Footage?"
                                                      control={form.control}/>
                                }

                                {
                                    activeCastFields["voiceOnly"] &&
                                    <HookFormCheckbox name="voiceOnly" label="Is Voice Only?" control={form.control}/>
                                }

                                {
                                    activeCastFields["motionCapture"] &&
                                    <HookFormCheckbox name="motionCapture" label="Is Motion Captured?"
                                                      control={form.control}/>
                                }
                            </section>
                        </fieldset>
                        <Separator/>
                    </>
                }

                {
                    activeFields["notes"] && <>
                        <HookFormTextArea name="notes" label="Notes" control={form.control}/>
                    </>
                }

                <section className="grid grid-cols-4 gap-2">
                    <Button
                        disabled={isPending}
                        className={cn(PrimaryButtonCSS, "bg-primary col-span-3")}
                        variant="default"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button disabled={isPending} className={cn(SecondaryButtonCSS, "bg-secondary text-primary")}
                            variant="secondary" type="button" onClick={reset}>
                        <RefreshCw/>
                    </Button>
                </section>
            </form>
        </Form>
    );
};

export default MovieCreditSubmitFormView;
