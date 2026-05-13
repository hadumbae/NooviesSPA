/**
 * @fileoverview Form view for uploading and submitting movie poster images.
 */

import {ReactElement} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {cn} from "@/common/lib/utils.ts";
import {HookFormFileInput} from "@/common/components/forms/HookFormFileInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ImageUp, Loader} from "lucide-react";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormValues
} from "@/domains/movies/_feat/manage-images";

/** Props for the MoviePosterImageSubmitFormView component. */
type ViewProps = {
    form: UseFormReturn<MoviePosterImageFormValues, unknown, MoviePosterImageFormData>;
    mutation: UseMutationResult<Movie, unknown, MoviePosterImageFormData>;
    submitHandler: SubmitHandler<MoviePosterImageFormValues>;
    className?: string;
};

/** Form component for movie poster image uploads. */
export function MoviePosterImageSubmitFormView(
    {form, mutation, submitHandler, className}: ViewProps
): ReactElement {
    const {isPending} = mutation;

    const uploadButton = (
        <Button
            variant="default"
            disabled={isPending}
            className={cn("w-full bg-primary", PrimaryButtonCSS)}
            aria-busy={isPending}
        >
            {isPending ? <Loader className="animate-spin"/> : <> <ImageUp/> Upload </>}
        </Button>
    );

    const acceptedFileTypes = ACCEPTED_IMAGE_TYPES
        .map((t) => t.replace("image/", "").toUpperCase())
        .join(", ");

    const fileInputDescription = `Accepted File Types: ${acceptedFileTypes}`;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                <HookFormFileInput
                    name="posterImage"
                    label="Poster Image"
                    control={form.control}
                    disabled={isPending}
                    description={fileInputDescription}
                />

                {uploadButton}
            </form>
        </Form>
    );
}
