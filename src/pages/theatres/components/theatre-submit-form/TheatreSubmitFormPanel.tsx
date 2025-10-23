import {FC, ReactNode, useState} from 'react';
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
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

type FormPanelEditingProps = {
    isEditing: true;
    theatre: Theatre | TheatreDetails;
} | {
    isEditing?: false;
    theatre?: never;
};

type FormPanelProps = MutationOnSubmitParams<Theatre> & {
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

    const closeOnSuccess = (theatre?: Theatre) => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess(theatre);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default TheatreSubmitFormPanel;
