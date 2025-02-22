import {FC} from 'react';
import useFetchShowingSeating from "@/pages/seatmap/hooks/queries/useFetchShowingSeating.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import ShowingSeatMapCard from "@/pages/seatmap/components/ShowingSeatMapCard.tsx";
import QueryErrorHandler from "@/common/components/errors/QueryErrorHandler.tsx";
import CenteredLoader from "@/common/components/loaders/CenteredLoader.tsx";

interface Props {
    showingID: string;
}

const ShowingSeatMapFilterList: FC<Props> = ({showingID}) => {
    const {page, perPage} = usePaginationSearchParams({page: "1", perPage: "25"});
    const {data, isPending, isError, error, refetch} = useFetchShowingSeating({showingID, page, perPage});

    if (isPending) return <CenteredLoader />;
    if (isError) return <QueryErrorHandler error={error} />;

    const {items: seatMaps} = data;

    if (seatMaps.length === 0) {
        return <div className="flex justify-center">
            <span className="italic text-neutral-500">No Seating</span>
        </div>
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                seatMaps.map(seatMap =>
                    <ShowingSeatMapCard
                        key={seatMap._id}
                        seatMap={seatMap}
                        onUpdate={() => refetch()}
                        onDelete={() => refetch()}
                    />
            )}
        </div>

    );
};

export default ShowingSeatMapFilterList;
