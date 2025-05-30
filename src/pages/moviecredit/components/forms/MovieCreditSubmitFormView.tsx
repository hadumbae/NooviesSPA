import {FC} from 'react';
import {UseMutationResult} from "@tanstack/react-query";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {RefreshCw} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import {MovieCreditFormBaseValues} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitBaseSchema.ts";

import generateReactSelectOptions from "@/common/utility/forms/generateReactSelectOptions.ts";

import RoleTypeRadioGroup from "@/pages/moviecredit/components/inputs/RoleTypeRadioGroup.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";

import MovieCreditSubmitFormCrewFieldset
    from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormCrewFieldset.tsx";
import MovieCreditSubmitFormFlagsFieldset
    from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormFlagsFieldset.tsx";
import MovieCreditSubmitFormCastFieldset
    from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormCastFieldset.tsx";

interface ViewProps<TKey = keyof Partial<MovieCreditFormBaseValues>> {
    form: UseFormReturn<MovieCreditFormValues>;
    submitHandler: SubmitHandler<MovieCreditFormValues>
    mutation: UseMutationResult<MovieCredit, Error, MovieCreditSubmit>;

    movies: Movie[];
    persons: Person[];

    disableFields?: TKey[];
}

const MovieCreditSubmitFormView: FC<ViewProps> = (params) => {
    const {form, submitHandler, mutation, persons, movies, disableFields = []} = params;

    const {isPending} = mutation;
    const reset = () => form.reset();
    const roleType = form.watch("roleType");

    const movieOptions = generateReactSelectOptions({data: movies, labelKey: "title", valueKey: "_id"});
    const personOptions = generateReactSelectOptions({data: persons, labelKey: "name", valueKey: "_id"});

    const activeFields = {
        roleType: !disableFields.includes("roleType"),
        movie: !disableFields.includes("movie"),
        person: !disableFields.includes("person"),
        notes: !disableFields.includes("person"),
        uncredited: !disableFields.includes("uncredited"),
        voiceOnly: !disableFields.includes("voiceOnly"),
        cameo: !disableFields.includes("cameo"),
        motionCapture: !disableFields.includes("motionCapture"),
    };

    const activeCrewFields = {
        job: !disableFields.includes("job"),
    };

    const activeCastFields = {
        characterName: !disableFields.includes("characterName"),
        billingOrder: !disableFields.includes("billingOrder"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5")}>

                {
                    activeFields["roleType"] &&
                    <RoleTypeRadioGroup
                        form={form}
                        name="roleType"
                        label="Role Type"
                        className="flex flex-row justify-start space-x-5"
                    />
                }

                <Separator/>

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

                <Separator/>

                {
                    roleType === "CREW" &&
                    <MovieCreditSubmitFormCrewFieldset form={form} activeFields={activeCrewFields}/>
                }

                {
                    roleType === "CAST" &&
                    <MovieCreditSubmitFormCastFieldset form={form} activeFields={activeCastFields}/>
                }

                <Separator/>

                <MovieCreditSubmitFormFlagsFieldset
                    form={form}
                    className="grid grid-cols-2 gap-2"
                    activeFields={activeFields}
                />

                <Separator/>

                {
                    activeFields["notes"] &&
                    <HookFormTextArea name="notes" label="Notes" control={form.control}/>
                }

                <section className="grid grid-cols-4 gap-2">
                    <Button disabled={isPending} className="bg-primary col-span-3" variant="default" type="submit">
                        Submit
                    </Button>
                    <Button disabled={isPending} className="bg-secondary text-primary hover:text-black"
                            variant="secondary" type="button" onClick={reset}>
                        <RefreshCw/>
                    </Button>
                </section>
            </form>
        </Form>
    );
};

export default MovieCreditSubmitFormView;
