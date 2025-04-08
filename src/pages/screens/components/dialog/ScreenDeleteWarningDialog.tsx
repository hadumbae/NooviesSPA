import {FC, PropsWithChildren} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/common/components/ui/alert-dialog"
import useScreenDeleteMutation from "@/pages/screens/hooks/useScreenDeleteMutation.ts";
import {Loader} from "lucide-react";

interface Props {
    className?: string
    onDelete?: () => void;
    screen: Screen;
}

const ScreenDeleteWarningDialog: FC<PropsWithChildren<Props>> = ({children, className, onDelete, screen}) => {
    const {mutate, isPending, isSuccess} = useScreenDeleteMutation({onDelete});
    const {_id, name} = screen;

    const deleteScreen = () => {
        mutate({_id});
    }

    const isDisabled = isPending || isSuccess;

    return (
        <AlertDialog>
            <AlertDialogTrigger className={className} disabled={isPending}>
                {isDisabled ? <Loader className="animate-spin" /> : children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Proceed To Delete "{name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the screen and any associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteScreen}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ScreenDeleteWarningDialog;
