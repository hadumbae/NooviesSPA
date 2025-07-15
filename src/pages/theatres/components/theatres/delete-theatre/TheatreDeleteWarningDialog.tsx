import {FC, PropsWithChildren} from 'react';
import useTheatreDeleteMutation from "@/pages/theatres/hooks/mutations/useTheatreDeleteMutation.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

type DeleteMutationProps = FormMutationOnSubmitParams & {
    theatreName?: string;
    theatreID: ObjectId;
}

const TheatreDeleteWarningDialog: FC<PropsWithChildren<DeleteMutationProps>> = (params) => {
    const {children, theatreName, theatreID, ...mutationOptions} = params;

    const {mutate} = useTheatreDeleteMutation(mutationOptions);

    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`
    const deleteTheatre = () => mutate({_id: theatreID});

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children ? children : <span>Delete</span>}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be reversed. Related data will also be removed. Do you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteTheatre}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TheatreDeleteWarningDialog;
