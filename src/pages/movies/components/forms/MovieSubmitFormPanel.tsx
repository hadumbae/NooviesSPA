import { FC, ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieFormValues } from "@/pages/movies/schema/form/MovieForm.types.ts";
import MovieSubmitFormContainer from "@/pages/movies/components/forms/MovieSubmitFormContainer.tsx";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import { PresetOpenState } from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";

/**
 * Props for `MovieSubmitFormPanel`.
 *
 * @template TEntity - The type of entity being managed (here `Movie`).
 * @template TReturn - The type returned by the mutation (here `Movie`).
 * @template TFormValues - The type of the form values (here `MovieFormValues`).
 */
type FormPanelProps = FormContainerProps<Movie, Movie, MovieFormValues> &
    PresetOpenState & {
    /** Optional trigger element (e.g., button or icon) that opens the panel. */
    children?: ReactNode;
};

/**
 * `MovieSubmitFormPanel` is a slide-over panel component for creating or editing movies.
 *
 * It wraps `MovieSubmitFormContainer` inside a `Sheet` (slide-over UI component)
 * and handles open/close state automatically. The panel:
 *
 * - Displays a dynamic sheet title and description based on whether creating or editing a movie.
 * - Supports controlled or uncontrolled open state via `presetOpen` and `setPresetOpen`.
 * - Automatically closes the sheet on successful form submission.
 * - Forwards the submission success callback to parent components.
 * - Wraps the form in a scrollable area to handle large forms.
 *
 * @param props - Configuration and form props.
 * @param props.children - Optional trigger element (button/icon) that opens the panel.
 * @param props.presetOpen - Optional controlled open state.
 * @param props.setPresetOpen - Optional setter for controlled open state.
 * @param props.isEditing - Whether the form is editing an existing movie.
 * @param props.onSubmitSuccess - Callback invoked after successful form submission.
 * @param props.* - Additional props are forwarded to `MovieSubmitFormContainer`.
 *
 * @example
 * ```tsx
 * <MovieSubmitFormPanel
 *   isEditing={false}
 *   onSubmitSuccess={(movie) => console.log("Created movie:", movie)}
 * >
 *   <Button>Create Movie</Button>
 * </MovieSubmitFormPanel>
 * ```
 */
const MovieSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const { children, presetOpen, setPresetOpen, onSubmitSuccess, ...formProps } = props;
    const { isEditing } = formProps;

    // ⚡ Open State ⚡

    const { activeOpen, setActiveOpen } = usePresetActiveOpen({ presetOpen, setPresetOpen });

    // ⚡ Sheet Configuration ⚡

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie`;
    const sheetDescription = `${action} your movie here by submitting data with the form.`;

    // ⚡ Handler ⚡

    const closeOnSuccess = (movie: Movie) => {
        setActiveOpen(false);
        onSubmitSuccess?.(movie);
    };

    return (
        <Sheet open={activeOpen} onOpenChange={setActiveOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <MovieSubmitFormContainer
                        {...formProps}
                        onSubmitSuccess={closeOnSuccess}
                        isPanel={true}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MovieSubmitFormPanel;
