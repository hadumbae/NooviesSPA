import {FC, ReactNode, useState} from 'react';
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
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

type ScreenEditingProps = {
    isEditing: true;
    screen: Screen;
} | {
    isEditing?: false;
    screen?: never;
};

type FormPanelProps = FormMutationOnSubmitParams<Screen> & {
    children?: ReactNode;
    className?: string;
    title?:string;
    description?: string;
    presetValues?: Partial<ScreenFormValues>;
    disableFields?: (keyof ScreenFormValues)[];
} & (| ScreenEditingProps);

const ScreenSubmitFormPanel: FC<FormPanelProps> = (params) => {
    const {
        children,
        onSubmitSuccess,
        title = "Submit Screen Data",
        description = "Input screen data and submit it.",
        ...formParams
    } = params;

    const [open, setOpen] = useState<boolean>(false);

    const closeOnSuccess = (screen?: Screen) => {
            setOpen(false);
            onSubmitSuccess && onSubmitSuccess(screen);
    }

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
