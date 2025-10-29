import { FC, ReactNode, useState } from 'react';
import { PresetOpenState } from "@/common/type/ui/OpenStateProps.ts";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import MoviePosterImageSubmitFormContainer
    from "@/pages/movies/components/forms/poster-image/MoviePosterImageSubmitFormContainer.tsx";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for `MoviePosterImageSubmitFormPanel`.
 *
 * Combines:
 * - `PresetOpenState` to support controlled or uncontrolled open state for the sheet.
 * - `FormMutationOnSubmitParams<Movie>` to handle submission callbacks.
 * - `movieID` to identify which movie the poster belongs to.
 * - Optional `children` to act as the `SheetTrigger` element.
 */
type FormPanelProps =
    PresetOpenState &
    MutationOnSubmitParams<Movie> & {
    /** The ID of the movie for which the poster image is being uploaded */
    movieID: ObjectId;

    /** Optional trigger element for the sheet (e.g., button) */
    children?: ReactNode;
};

/**
 * Slide-over panel for submitting a movie poster image.
 *
 * Features:
 * - Can operate in **controlled mode** (via `presetOpen` + `setPresetOpen`) or **uncontrolled mode** (internal state).
 * - Displays a scrollable form (`MoviePosterImageSubmitFormContainer`) for uploading a poster image.
 * - Automatically closes the sheet and calls `onSubmitSuccess` on successful submission.
 *
 * @param props - FormPanelProps
 */
const MoviePosterImageSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const { children, presetOpen, setPresetOpen, onSubmitSuccess, movieID, ...formProps } = props;

    // Determine whether the sheet is controlled or uncontrolled
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;

    // Internal state for uncontrolled mode
    const internalOpenState = useState<boolean>(false);

    // Use controlled props if available, otherwise internal state
    const [isSheetOpen, setIsSheetOpen] = isControlled ? [presetOpen, setPresetOpen] : internalOpenState;

    const title = "Upload Poster Image";
    const description = "Upload poster image here. Select image and upload.";

    /**
     * Callback executed after successful form submission.
     * Closes the sheet and calls `onSubmitSuccess`.
     */
    const closeOnSubmit = (movie: Movie) => {
        setIsSheetOpen(false);
        onSubmitSuccess?.(movie);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex flex-grow">
                    <MoviePosterImageSubmitFormContainer
                        movieID={movieID}
                        {...formProps}
                        onSubmitSuccess={closeOnSubmit}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MoviePosterImageSubmitFormPanel;
