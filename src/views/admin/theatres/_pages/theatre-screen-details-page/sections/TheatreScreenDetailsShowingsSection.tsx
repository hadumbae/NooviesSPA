import {ReactElement} from "react";
import {EmptyArrayContainer, IconButton, PageSectionHeader} from "@/views/common/_comp";
import {LoggedLink} from "@/views/common/_feat";
import {List} from "lucide-react";
import {ShowingDetails} from "@/domains/showings";
import {cn} from "@/common/_feat";
import {ShowingSummaryCard} from "@/views/admin/showings";
import {ObjectId} from "@/common/_schemas";

type SectionProps = {
    screenID: ObjectId;
    showings: ShowingDetails[];
};

export function TheatreScreenDetailsShowingsSection(
    {screenID, showings}: SectionProps
): ReactElement {
    return (
        <section>
            <div className="flex justify-between items-center">
                <PageSectionHeader>Recent Showings</PageSectionHeader>

                <LoggedLink to={`/admin/showings?screen=${screenID}`}>
                    <IconButton icon={List}/>
                </LoggedLink>
            </div>

            {
                showings.length ? (
                    <div className={cn("grid grid-cols-1 gap-2")}>
                        {showings.map((showing) => (
                            <ShowingSummaryCard key={showing._id} showing={showing}/>
                        ))}
                    </div>
                ) : (
                    <EmptyArrayContainer
                        className="h-28"
                        text="There Are No Showings"
                    />
                )
            }
        </section>
    );
}