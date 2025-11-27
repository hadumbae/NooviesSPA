import useSeatMapUpdateAvailabilityMutation from "@/pages/seatmap/hooks/mutations/useSeatMapUpdateAvailabilityMutation.ts";
import useSeatMapDeleteMutation from "@/pages/seatmap/hooks/mutations/useSeatMapDeleteMutation.ts";

import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

interface Params {
    seatMap: SeatMap;
    onUpdate: (seatMap: SeatMap) => void;
    onDelete: (seatMap: SeatMap) => void;
}

export default function useSeatMapOptionsHooks(params: Params) {
    const {seatMap, onUpdate, onDelete} = params;

    const toggleAvailabilityMutation = useSeatMapUpdateAvailabilityMutation({onToggle: onUpdate});
    const deleteSeatMapMutation = useSeatMapDeleteMutation({onDelete: () => onDelete(seatMap)});

    const {
        mutate: updateAvailability,
        isPending: isUpdatingAvailability,
        isSuccess: updatedAvailability,
    } = toggleAvailabilityMutation;

    const {
        mutate: deleteSeatMap,
        isPending: isDeletingSeatMap,
        isSuccess: deletedSeatMap,
    } = deleteSeatMapMutation;

    return {
        updateAvailability,
        isUpdatingAvailability,
        updatedAvailability,
        toggleAvailabilityMutation,
        deleteSeatMap,
        isDeletingSeatMap,
        deletedSeatMap,
        deleteSeatMapMutation,
    };
}