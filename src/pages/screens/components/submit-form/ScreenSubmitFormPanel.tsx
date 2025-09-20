import {FC, ReactNode, useState} from 'react';
import type {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/submit-form/ScreenSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the `ScreenSubmitFormPanel` component.
 *
 * Extends `FormContainerProps` to include form handling for `Screen` entities.
 * Provides optional UI customization for the panel including title, description, and children trigger.
 */
type FormPanelProps = FormContainerProps<Screen, Screen, ScreenFormValues> & {
    /** Optional React children to render inside the panel trigger. Defaults to a simple "Open" button if not provided. */
    children?: ReactNode;

    /** Optional additional CSS class names to apply to the sheet content. */
    className?: string;

    /** Optional title to display at the top of the sheet panel. Defaults to "Submit Screen Data". */
    title?: string;

    /** Optional description to display below the title. Defaults to "Input screen data and submit it." */
    description?: string;
};

/**
 * `ScreenSubmitFormPanel` renders a slide-over panel containing a form for submitting `Screen` data.
 *
 * - Uses `Sheet` as the main panel container.
 * - Supports create and edit modes via `FormContainerProps`.
 * - Automatically closes the panel on successful submission.
 *
 * @param props - Component props extending `FormContainerProps` with optional UI customization
 * @returns A fully controlled form panel component
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormPanel
 *    onSubmitSuccess={(screen) => console.log("Screen saved:", screen)}
 * >
 *    <button>Open Form</button>
 * </ScreenSubmitFormPanel>
 * ```
 */
const ScreenSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const {
        children,
        onSubmitSuccess,
        title = "Submit Screen Data",
        description = "Input screen data and submit it.",
        ...formParams
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    /**
     * Closes the panel and triggers the optional `onSubmitSuccess` callback.
     *
     * @param screen - The successfully submitted `Screen` entity
     */
    const closeOnSuccess = (screen: Screen) => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess(screen);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <ScreenSubmitFormContainer
                        onSubmitSuccess={closeOnSuccess}
                        {...formParams}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default ScreenSubmitFormPanel;
