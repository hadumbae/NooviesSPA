import { FC } from 'react';
import { Form } from "@/common/components/ui/form.tsx";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { MoviePosterImageForm, MoviePosterImageFormValues } from "@/pages/movies/schema/form/MoviePosterImage.types.ts";
import { UseMutationResult } from "@tanstack/react-query";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import { cn } from "@/common/lib/utils.ts";
import HookFormFileInput from "@/common/components/forms/HookFormFileInput.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { ImageUp, Loader } from "lucide-react";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";

/**
 * Props for the `MoviePosterImageSubmitFormView` component.
 */
type ViewProps = {
    /** The React Hook Form instance controlling this form */
    form: UseFormReturn<MoviePosterImageFormValues>;

    /** Mutation object from `react-query` to handle form submission */
    mutation: UseMutationResult<Movie, unknown, MoviePosterImageForm>;

    /** Handler function called on form submission */
    submitHandler: SubmitHandler<MoviePosterImageFormValues>;

    /** Optional additional CSS class names for styling the form container */
    className?: string;
};

/**
 * A form view component for submitting a movie poster image.
 *
 * This component renders:
 * - A file input for uploading the poster image, with accepted file type info.
 * - A submit button that shows a spinner while submission is in progress.
 *
 * The file input and button are disabled while the mutation is pending to prevent
 * duplicate submissions or changes mid-upload.
 *
 * Accessibility:
 * - The button includes `aria-busy` to indicate submission state to assistive technologies.
 *
 * @param props - ViewProps
 * @returns A JSX element rendering the poster image submission form
 */
const MoviePosterImageSubmitFormView: FC<ViewProps> = (props) => {
    const { form, mutation, submitHandler, className } = props;
    const { isPending } = mutation;

    /**
     * JSX for the submit button.
     * Shows a loader icon when submitting, otherwise shows the default icon and text.
     */
    const uploadButton = (
        <Button
            variant="default"
            disabled={isPending}
            className="w-full bg-primary"
            aria-busy={isPending}
        >
            {isPending ? <Loader className="animate-spin" /> : <> <ImageUp /> Upload </>}
        </Button>
    );

    /**
     * Human-readable description of accepted image file types for the file input.
     * Converts MIME types like "image/png" → "PNG".
     */
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
};

export default MoviePosterImageSubmitFormView;
