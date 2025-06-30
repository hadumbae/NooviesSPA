import {FC, PropsWithChildren, useState} from 'react';

import {Button} from "@/common/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui/dialog.tsx"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/common/components/ui/drawer.tsx"
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import ScreenSubmitFormContainer from "@/pages/screens/components/submit-form/ScreenSubmitFormContainer.tsx";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

type FormDrawerProps = FormMutationOnSubmitParams<Screen> & {
    theatreID: ObjectId;
}

const TheatreScreenFormDrawer: FC<PropsWithChildren<FormDrawerProps>> = ({children, theatreID, ...formOptions}) => {
    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = !useIsMobile();

    const {onSubmitSuccess} = formOptions;

    const presetValues = {theatre: theatreID};
    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

    const onScreenAdd = (screen: Screen) => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess(screen);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Screens</DialogTitle>
                        <DialogDescription>Add new screens for the theatre here.</DialogDescription>
                    </DialogHeader>

                    <ScreenSubmitFormContainer
                        {...formOptions}
                        onSubmitSuccess={onScreenAdd}
                        presetValues={presetValues}
                        disableFields={disableFields}
                    />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} fadeFromIndex={0} snapPoints={[]}
        >
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Screens</DrawerTitle>
                    <DrawerDescription>Add new screens for the theatre here.</DrawerDescription>
                </DrawerHeader>

                {/* Contents */}
                {/*<TheatreScreenSubmitFormContainer theatreID={theatreID} onSubmit={onScreenAdd} className="px-4" />*/}
                <ScreenSubmitFormContainer onSubmitSuccess={onScreenAdd} presetValues={presetValues}
                                           disableFields={disableFields} className="px-4"/>;


                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default TheatreScreenFormDrawer;
