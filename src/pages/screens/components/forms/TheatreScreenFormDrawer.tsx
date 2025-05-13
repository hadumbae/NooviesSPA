import {FC, PropsWithChildren, useState} from 'react';
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";

import { Button } from "@/common/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/common/components/ui/drawer"
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import TheatreScreenSubmitFormContainer from "@/pages/screens/components/forms/TheatreScreenSubmitFormContainer.tsx";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface Props {
    theatreID: ObjectId;
    onSubmit: (screen: Screen) => void;
}

const TheatreScreenFormDrawer: FC<PropsWithChildren<Props>> = ({children, theatreID, onSubmit}) => {
    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = !useIsMobile();

    const onScreenAdd = (screen: Screen) => {
        onSubmit(screen);
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Screens</DialogTitle>
                        <DialogDescription>Add new screens for the theatre here.</DialogDescription>
                    </DialogHeader>

                    {/* Contents */}
                    <TheatreScreenSubmitFormContainer theatreID={theatreID} onSubmit={onScreenAdd} />

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
                <TheatreScreenSubmitFormContainer theatreID={theatreID} onSubmit={onScreenAdd} className="px-4" />

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
