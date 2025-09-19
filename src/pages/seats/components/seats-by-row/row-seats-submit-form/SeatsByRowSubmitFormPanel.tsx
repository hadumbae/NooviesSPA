import {FC, PropsWithChildren, useState} from 'react';
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import SeatsByRowSubmitFormContainer
    from "@/pages/seats/components/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormContainer.tsx";

import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

type PanelProps = FormMutationOnSubmitParams & {
    presetValues?: Partial<SeatsByRowFormValues>;
    disableFields?: (keyof SeatsByRowFormValues)[];
    className?: string;
}

const SeatsByRowSubmitFormPanel: FC<PropsWithChildren<PanelProps>> = (params) => {
    const {children, presetValues, disableFields, className, onSubmitSuccess, ...options} = params;
    const [open, setOpen] = useState<boolean>(false);

    const closeOnSuccess = () => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess();
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>{children ? children : "Open"}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Seats By Row</SheetTitle>
                    <SheetDescription>Create seats by row.</SheetDescription>
                </SheetHeader>

                <SeatsByRowSubmitFormContainer
                    presetValues={presetValues}
                    disableFields={disableFields}
                    className={className}
                    onSubmitSuccess={closeOnSuccess}
                    {...options}
                />

            </SheetContent>
        </Sheet>
    );
};

export default SeatsByRowSubmitFormPanel;
