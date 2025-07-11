import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Loader, TriangleAlert} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import useSeatDeleteMutation from "@/pages/seats/hooks/mutations/useSeatDeleteMutation.ts";

type WarningProps = {
    seatID: ObjectId;
    onDelete?: () => void;
}

const DeleteSeatWarning: FC<WarningProps> = ({seatID, onDelete}) => {
    const {mutate, isPending} = useSeatDeleteMutation();

    const deleteSeat = () => {
        mutate({_id: seatID});
        onDelete && onDelete();
    }


    return (
        <>
            <TriangleAlert size={50} className="text-red-500"/>

            <p className="text-sm justify">
                Are you sure you want to delete the seat? All related data will be removed as
                well. This can not be reverted. Do you want to proceed?
            </p>

            <Button
                className="w-full bg-primary" variant="default"
                onClick={deleteSeat} disabled={isPending}
            >
                {
                    isPending
                        ? <Loader className="animate-spin"/>
                        : "Delete Seat"
                }
            </Button>
        </>
    );
};

export default DeleteSeatWarning;
