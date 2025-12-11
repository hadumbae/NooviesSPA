import {ReactNode, useState} from 'react';
import type {Screen, ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/submit-form/ScreenSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";

/**
 * Props for `ScreenSubmitFormPanel`.
 *
 * Extends `FormContainerProps` to provide form handling for `Screen` entities,
 * while adding UI-related configuration such as panel title, description, and trigger content.
 *
 * @template TEntity - Always `Screen`
 * @template TForm - Always `Screen`
 * @template TFormValues - Always `ScreenFormValues`
 */
type FormPanelProps = FormContainerProps<ScreenDetails, Screen, ScreenFormValues> & PresetOpenState & {
    /** Optional React node to render as the panel trigger. Defaults to `"Open"` if unspecified. */
    children?: ReactNode;

    /** Optional CSS class name(s) applied to the underlying sheet content element. */
    className?: string;

    /** Title displayed in the panel header. Defaults to `"Submit Screen Data"`. */
    title?: string;

    /** Description displayed below the title. Defaults to `"Input screen data and submit it."` */
    description?: string;
};

/**
 * Slide-over panel that wraps `ScreenSubmitFormContainer` inside a `Sheet`.
 *
 * Provides:
 * - A controlled or uncontrolled open state (`PresetOpenState`)
 * - Auto-closing behavior on successful form submission
 * - UI header (title + description)
 * - Customizable trigger element
 *
 * This component is intended for use when submitting or editing `Screen` data in a compact panel UI.
 *
 * @param props - Panel and form configuration options.
 * @returns A panel containing a screen submission form.
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormPanel
 *   onSubmitSuccess={(screen) => console.log("Saved:", screen)}
 * >
 *   <button>Open Form</button>
 * </ScreenSubmitFormPanel>
 * ```
 */
const ScreenSubmitFormPanel = (props: FormPanelProps) => {
    const {
        children,
        onSubmitSuccess,
        title = "Submit Screen Data",
        description = "Input screen data and submit it.",
        presetOpen,
        setPresetOpen,
        ...formParams
    } = props;

    // --- Controlled vs Uncontrolled Open State ---
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const [open, setOpen] = useState<boolean>(false);

    const activeOpen = isControlled ? presetOpen : open;
    const setActiveOpen = isControlled ? setPresetOpen : setOpen;

    /**
     * Handles a successful form submission by closing the panel
     * and forwarding the submitted entity to any provided callback.
     *
     * @param screen - The successfully saved `Screen` entity.
     */
    const closeOnSuccess = (screen: ScreenDetails) => {
        setActiveOpen(false);
        onSubmitSuccess?.(screen);
    };

    // --- Render ---
    return (
        <Sheet open={activeOpen} onOpenChange={setActiveOpen}>
            <SheetTrigger asChild>{children ?? "Open"}</SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <ScreenSubmitFormContainer
                        {...formParams}
                        onSubmitSuccess={closeOnSuccess}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default ScreenSubmitFormPanel;
