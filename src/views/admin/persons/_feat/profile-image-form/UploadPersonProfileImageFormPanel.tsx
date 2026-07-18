/**
 * @fileoverview Slide-over panel containing the profile image upload form for a person.
 */

import {ReactElement, ReactNode} from 'react';
import {HookFormFileInput} from "@/views/common/_feat/form-inputs/HookFormFileInput.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {AnimatedLoader} from "@/views/common/_comp/loaders/AnimatedLoader.tsx";
import {cn} from "@/common/_feat";
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

/** Props for the UploadPersonProfileImageFormPanel component. */
type FormPanelProps = {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

/**
 * A side-drawer component for submitting a person's profile image. Requires BaseFormContext.
 */
export function UploadPersonProfileImageFormPanel(
    {children, className, isOpen, setIsOpen}: FormPanelProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Upload Profile Image</SheetTitle>
                    <SheetDescription>
                        Select a new image file (JPG, PNG, or WEBP) and click submit to update the profile.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-6">
                    <div className={cn("space-y-4", className)}>
                        <HookFormFileInput name="profileImage" label="Profile Image"/>

                        <Button form={formID} className="w-full" variant="primary" type="submit">
                            {isPending ? <AnimatedLoader/> : "Submit"}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}