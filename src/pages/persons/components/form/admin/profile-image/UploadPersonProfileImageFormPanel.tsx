import {FC, ReactNode, useState} from 'react';
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import UploadPersonProfileImageFormContainer
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormContainer.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {PresetOpenState} from "@/common/type/OpenStateProps.ts";

/**
 * Props for `UploadPersonProfileImageFormPanel`.
 *
 * @property children - Optional trigger element for opening the panel.
 * @property className - Optional CSS class to apply to the form container.
 * @property personID - The ID of the person whose profile image is being updated.
 * @property presetOpen - Optional controlled open state for the panel.
 * @property setPresetOpen - Optional setter for controlled open state.
 */
type FormPanelProps = FormMutationOnSubmitParams<Person> & PresetOpenState & {
    children?: ReactNode;
    className?: string;
    personID: ObjectId;
};

/**
 * Slide-over panel for uploading a person's profile image.
 *
 * @remarks
 * - Uses `Sheet` for a sliding panel UI.
 * - Includes a `SheetHeader` with a title and description.
 * - Wraps the `UploadPersonProfileImageFormContainer` in a `ScrollArea` for scrollable content.
 * - Supports optional controlled open state via `presetOpen` / `setPresetOpen`.
 *
 * @example
 * ```tsx
 * <UploadPersonProfileImageFormPanel personID={person.id}>
 *   <Button>Upload Profile Image</Button>
 * </UploadPersonProfileImageFormPanel>
 * ```
 */
const UploadPersonProfileImageFormPanel: FC<FormPanelProps> = (props) => {
    const {children, className, personID, presetOpen, setPresetOpen} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const sheetTitle = "Upload Profile Image";
    const sheetDescription = "Upload your profile images here. Select the image and hit the `Upload` button.";

    return (
        <Sheet open={presetOpen ?? isOpen} onOpenChange={setPresetOpen ?? setIsOpen}>
            <SheetTrigger>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <UploadPersonProfileImageFormContainer
                        personID={personID}
                        className={className}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default UploadPersonProfileImageFormPanel;
