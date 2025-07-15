import {FC, ReactNode, useState} from 'react';
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {Theatre, TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import TheatreSubmitFormContainer from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormContainer.tsx";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";

type FormPanelEditingProps = {
    isEditing: true;
    theatre: Theatre | TheatreDetails;
} | {
    isEditing?: false;
    theatre?: never;
};

type FormPanelProps = FormMutationOnSubmitParams & {
    children?: ReactNode;
    className?: string;
    presetValues?: Partial<TheatreFormValues>;
    disableFields?: (keyof TheatreFormValues)[];
} & (| FormPanelEditingProps);

const TheatreSubmitFormPanel: FC<FormPanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);
    const {children, onSubmitSuccess, ...formParams} = params;
    const {isEditing} = formParams;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Theatre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} theatres by submitting data.`;

    const closeOnSuccess = () => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess();
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <TheatreSubmitFormContainer
                    {...formParams}
                    onSubmitSuccess={closeOnSuccess}
                />
            </SheetContent>
        </Sheet>
    );
};

export default TheatreSubmitFormPanel;
