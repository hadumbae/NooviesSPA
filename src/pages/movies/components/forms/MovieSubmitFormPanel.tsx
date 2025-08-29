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
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import MovieSubmitFormContainer from "@/pages/movies/components/forms/MovieSubmitFormContainer.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";

/**
 * Base props for the `MovieSubmitFormPanel` component.
 *
 * These props extend `FormMutationOnSubmitParams`, except for `onSubmitSuccess` and
 * `onSubmitError`, which are replaced with custom handlers.
 */
type BaseProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /** Optional child element to use as the trigger (e.g., a button). */
    children?: ReactNode;
    /** Optional CSS class for styling the form panel. */
    className?: string;
    /** Pre-populated values for the form. Useful for editing or drafts. */
    presetValues?: Partial<MovieFormValues>;
    /** Fields that should be disabled in the form. */
    disableFields?: (keyof MovieFormValues)[];
    /** Callback when a movie is successfully submitted. */
    onSubmitSuccess?: (movie: Movie) => void;
    /** Callback when form submission fails. */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Props for editing an existing movie.
 */
type SubmitFormProps = BaseProps & {
    /** Indicates edit mode is active. */
    isEditing: true;
    /** The movie being edited. */
    movie: Movie;
};

/**
 * Props for creating a new movie.
 */
type EditFormProps = BaseProps & {
    /** Indicates create mode (default if omitted). */
    isEditing?: false;
};

/**
 * Union type for props accepted by `MovieSubmitFormPanel`.
 *
 * - `SubmitFormProps` → editing an existing movie
 * - `EditFormProps` → creating a new movie
 */
type FormPanelProps = SubmitFormProps | EditFormProps;

/**
 * A panel component that displays a form for creating or updating a movie.
 *
 * It uses a Radix UI `Sheet` as a sliding panel.
 * The form is rendered inside a scrollable area and submits via
 * `MovieSubmitFormContainer`.
 *
 * @example
 * ```tsx
 * <MovieSubmitFormPanel
 *   isEditing
 *   movie={selectedMovie}
 *   disableFields={["id"]}
 *   onSubmitSuccess={(movie) => console.log("Updated:", movie)}
 * >
 *   <button>Edit Movie</button>
 * </MovieSubmitFormPanel>
 * ```
 */
const MovieSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const {children, onSubmitSuccess, ...formProps} = props;
    const {isEditing} = formProps;

    const [open, setOpen] = useState<boolean>(false);

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie`;
    const sheetDescription = `${action} your movie here by submitting data with the form.`;

    /**
     * Local success handler that closes the panel and delegates to external `onSubmitSuccess`.
     */
    const onSuccess = (movie: Movie) => {
        setOpen(false);
        onSubmitSuccess?.(movie);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
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