import {FC} from 'react';
import ShowingSeatMapCompactList from "@/pages/showings/components/seatmap/ShowingSeatMapCompactList.tsx";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {Link} from "react-router-dom";
import PageSection from "@/common/components/page/PageSection.tsx";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface ShowingSeatingPageSectionProps {
    seating: SeatMap[];
    showingID: ObjectId;
}

const ShowingSeatingPageSection: FC<ShowingSeatingPageSectionProps> = ({seating, showingID}) => {
    if (seating.length > 0) {
        return <PageSection title="Seating">
            <ShowingSeatMapCompactList seating={seating as SeatMap[]}/>

            <div className="flex justify-end">
                <Link
                    to={`/admin/showings/get/${showingID}/seating`}
                    className="text-neutral-500 hover:underline hover:text-black"
                >
                    &gt; More Details
                </Link>
            </div>
        </PageSection>
    }

    return (
        <PageSection title="Seating">
            <section className={cn(
                "flex flex-col",
                "space-y-2",
                "justify-center items-center",
            )}>
                <span className="text-neutral-400 select-none">There Are No Seating</span>
                <ButtonLink
                    className="text-neutral-400 hover:underline hover:text-black"
                    to={`/admin/showings/get/${showingID}/seating`}
                    size="sm"
                >
                    <Plus/> Create Seating
                </ButtonLink>
            </section>
        </PageSection>
    );
};

export default ShowingSeatingPageSection;
