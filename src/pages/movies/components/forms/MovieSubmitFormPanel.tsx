import {FC, ReactNode, useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import MovieSubmitFormContainer from "@/pages/movies/components/forms/MovieSubmitFormContainer.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";

/**
 * Props for `MovieSubmitFormPanel`.
 *
 * @template TEntity - The type of the entity being managed (here `Movie`).
 * @template TReturn - The type returned by the mutation (here also `Movie`).
 * @template TFormValues - The type of the form values (here `MovieFormValues`).
 */
type FormPanelProps = FormContainerProps<Movie, Movie, MovieFormValues> &
    PresetOpenState & {
    /** Optional trigger element (e.g., button or icon) that opens the panel. */
    children?: ReactNode;
};

/**
 * A panel component that displays a `MovieSubmitFormContainer` inside a slide-over sheet.
 *
 * Features:
 * - Wraps the form in a UI `Sheet` with a trigger element.
 * - Supports controlled or uncontrolled open state via `presetOpen`/`setPresetOpen`.
 * - Dynamically sets the sheet title and description based on whether the form is creating or editing a movie.
 * - Closes the sheet automatically when the form submission succeeds.
 * - Forwards success callback to parent components.
 *
 * @param props - Props controlling the form behavior, open state, and trigger element.
 * @param props.children - Optional React element that acts as the sheet trigger.
 * @param props.presetOpen - Controlled open state for the sheet (optional).
 * @param props.setPresetOpen - Setter for controlled open state (optional).
 * @param props.isEditing - Whether the form is editing an existing movie.
 * @param props.onSubmitSuccess - Callback invoked when the movie form is successfully submitted.
 * @param props.* - Additional props forwarded to `MovieSubmitFormContainer`.
 */
const MovieSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const {children, presetOpen, setPresetOpen, onSubmitSuccess, ...formProps} = props;
    const {isEditing} = formProps;

    // Determine whether open state is controlled externally or managed internally
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const internalOpenState = useState<boolean>(false);
    const [activeOpen, setActiveOpen] = isControlled ? [presetOpen, setPresetOpen] : internalOpenState;

    // Dynamic UI text based on create/edit mode
    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie`;
    const sheetDescription = `${action} your movie here by submitting data with the form.`;

    /**
     * Handles successful form submission.
     * Closes the sheet and invokes optional parent callback.
     *
     * @param movie - The submitted movie object.
     */
    const onSuccess = (movie: Movie) => {
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
                        onSubmitSuccess={onSuccess}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MovieSubmitFormPanel;
