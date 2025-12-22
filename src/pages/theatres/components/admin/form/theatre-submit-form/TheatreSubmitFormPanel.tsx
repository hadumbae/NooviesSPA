import { FC, ReactNode } from 'react';
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";

import {
    Sheet
} from "@/common/components/ui/Sheet/Sheet.tsx";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";
import {SheetContent} from "@/common/components/ui/Sheet/SheetContent.tsx";
import {SheetHeader} from "@/common/components/ui/Sheet/SheetHeader.tsx";
import {SheetTitle} from "@/common/components/ui/Sheet/SheetTitle.tsx";
import {SheetDescription} from "@/common/components/ui/Sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/common/components/ui/Sheet/SheetTrigger.tsx";
import TheatreSubmitFormContainer
    from "@/pages/theatres/components/admin/form/theatre-submit-form/TheatreSubmitFormContainer.tsx";

/**
 * Props for {@link TheatreSubmitFormPanel}.
 *
 * Extends {@link FormContainerProps} for theatre forms and {@link PresetOpenState}
 * for optional controlled open-state behavior.
 *
 * @property children - Optional trigger element used to open the slide-over panel.
 * @property className - Optional CSS class applied to the trigger wrapper.
 */
type FormPanelProps = FormContainerProps<Theatre, Theatre, TheatreFormValues> & PresetOpenState & {
    children?: ReactNode;
    className?: string;
};

/**
 * **TheatreSubmitFormPanel**
 *
 * A slide-over (sheet) panel that renders a {@link TheatreSubmitFormContainer} to
 * create or update a theatre entity.
 *
 * ### Features
 * - Can operate as **controlled** or **uncontrolled** depending on `presetOpen` / `setPresetOpen`.
 * - Triggered by a custom child element (`children`), or defaults to a simple `"Open"` string.
 * - Displays appropriate title/description depending on `isEditing`.
 * - Wraps the form content in a scrollable container for long forms.
 * - Automatically closes the panel after a successful submission and triggers `onSubmitSuccess`.
 *
 * ### Controlled vs Uncontrolled Behavior
 * - **Controlled:** Provide both `presetOpen` and `setPresetOpen` to externally manage open state.
 * - **Uncontrolled:** Omit both; the component manages its own internal `isOpen` state.
 *
 * @param params - Props that determine form behavior, edit mode, preset values, and UI interactions.
 *
 * @example
 * ```tsx
 * <TheatreSubmitFormPanel
 *   isEditing
 *   entity={theatre}
 *   disableFields={["location"]}
 *   onSubmitSuccess={(updated) => console.log(updated)}
 * >
 *   <Button>Edit Theatre</Button>
 * </TheatreSubmitFormPanel>
 * ```
 */
const TheatreSubmitFormPanel: FC<FormPanelProps> = (params) => {
    // ⚡ Props ⚡

    const { children, onSubmitSuccess, presetOpen, setPresetOpen, ...formParams } = params;
    const { isEditing } = formParams;

    // ⚡ State: Controlled vs Uncontrolled ⚡

    const {activeOpen, setActiveOpen} = usePresetActiveOpen({presetOpen, setPresetOpen});

    // ⚡ Header Text ⚡

    const sheetTitle = `${isEditing ? "Update" : "Create"} Theatre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} theatres by submitting data.`;

    // ⚡ Success Handler ⚡

    const closeOnSuccess = (theatre: Theatre) => {
        setActiveOpen(false);
        onSubmitSuccess?.(theatre);
    }

    // ⚡ Render ⚡

    return (
        <Sheet open={activeOpen} onOpenChange={setActiveOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <TheatreSubmitFormContainer
                        {...formParams}
                        onSubmitSuccess={closeOnSuccess}
                        isPanel={true}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default TheatreSubmitFormPanel;
