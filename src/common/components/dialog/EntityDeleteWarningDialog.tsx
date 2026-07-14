import {ReactElement, ReactNode} from 'react';
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui";

type DialogProps = PresetOpenState & {
    children?: ReactNode;
    title?: string;
    description?: string;
    deleteResource: () => void;
};

export default function EntityDeleteWarningDialog(
    {children, title, description, deleteResource, presetOpen, setPresetOpen}: DialogProps
): ReactElement {
    const {activeOpen, setActiveOpen} = usePresetActiveOpen({presetOpen, setPresetOpen});

    const dialogTitle = title ?? "Proceed to delete resource?";
    const dialogDescription = description ?? "This action cannot be reversed. Related data will also be removed. Do you want to proceed?";

    return (
        <AlertDialog open={activeOpen} onOpenChange={setActiveOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="default-container">
                <AlertDialogHeader>
                    <AlertDialogTitle className="primary-text">{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dialog-close-btn">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteResource} className="dialog-action-btn">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}