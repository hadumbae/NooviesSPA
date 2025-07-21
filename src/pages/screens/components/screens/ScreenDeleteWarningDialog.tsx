import {FC, PropsWithChildren} from 'react';
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useScreenDeleteMutation from "@/pages/screens/hooks/screens/delete-screens/useScreenDeleteMutation.ts";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";

type DialogProps = FormMutationOnSubmitParams & {
    screenID: ObjectId;
    screenName?: string;
}

const ScreenDeleteWarningDialog: FC<PropsWithChildren<DialogProps>> = (params) => {
    const {children, screenID, screenName, ...mutationParams} = params;

    const {mutate} = useScreenDeleteMutation(mutationParams);
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`

    const deleteScreen = () => mutate({_id: screenID});

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children ? children : "Delete"}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be reversed. Related data will also be removed. Do you want to proceed?
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
