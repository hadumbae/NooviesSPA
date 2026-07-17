/**
 * @fileoverview Slide-over panel (Sheet) component for Theatre Screen data submission.
 */

import {ReactElement} from 'react';
import {
    Button,
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui";
import {UIOpenStateProps} from "@/common/_types";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/_feat/generic-form-context";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";

import {TheatreScreenFormValues} from "@/domains/theatre-screens";
import {TheatreScreenFormView} from "@/views/admin/theatre-screens/_feat/submit-data/TheatreScreenFormView.tsx";

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
                    <SheetTitle>{title ?? "Submit Screen Data"}</SheetTitle>
                    <SheetDescription>{description ?? "Input screen data and submit it."}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-4">
                    <TheatreScreenFormView disableFields={disableFields}/>

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