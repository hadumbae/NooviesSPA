/**
 * @fileoverview Slide-over panel (Sheet) component for Theatre Screen data submission.
 * Handles the visual layout of form fields and the trigger mechanism for the side panel.
 */

import {ReactElement} from 'react';
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data";
import {Button} from "@/common/components/ui/button.tsx";
import {UIOpenStateProps} from "@/common/types";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/features/generic-form-context";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {
    TheatreScreenFormView
} from "./TheatreScreenFormView.tsx";

/**
 * Props for the ScreenSubmitFormPanel component.
 */
type FormPanelProps = UIOpenStateProps & FormViewProps<TheatreScreenFormValues> & {
    title?: string;
    description?: string;
};

/**
 * A side-drawer panel that renders Theatre Screen form inputs.
 */
export function TheatreScreenFormPanel(
    {children, title, description, isOpen, setIsOpen, disableFields}: FormPanelProps
): ReactElement {
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ?? <Button variant="outline">Open</Button>}</SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>
                        {title ?? "Submit Screen Data"}
                    </SheetTitle>
                    <SheetDescription>
                        {description ?? "Input screen data and submit it."}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-4">
                    <TheatreScreenFormView
                        disableFields={disableFields}
                    />

                    <Button
                        form={formID}
                        type="submit"
                        variant="default"
                        className="w-full bg-primary"
                        disabled={isPending}
                    >
                        {isPending ? "Submitting..." : "Submit"}
                    </Button>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}