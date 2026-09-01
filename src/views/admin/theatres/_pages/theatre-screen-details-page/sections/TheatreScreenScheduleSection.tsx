/**
 * @fileoverview Section component for rendering a list of recent showings assigned to a theatre screen.
 */

import {ReactElement} from "react";
import {EmptyArrayContainer, IconButton, PageSectionHeader} from "@/views/common/_comp";
import {LoggedLink} from "@/views/common/_feat";
import {List} from "lucide-react";
import {ShowingDetails} from "@/domains/showings";
import {ObjectId} from "@/common/_schemas";
import { TheatreScreenScheduleCard } from "@/views/admin/theatre-screens/_comp";

/** Props for the TheatreScreenScheduleSection component. */
type SectionProps = {
    screenID: ObjectId;
    showings: ShowingDetails[];
};

/** Displays a header and a grid of recent showings or an empty state for a specific theatre screen. */
export function TheatreScreenScheduleSection(
    {screenID, showings}: SectionProps
): ReactElement {
    return (
        <section className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <PageSectionHeader>Recent Showings</PageSectionHeader>

                <LoggedLink to={`/admin/showings?screen=${screenID}`}>
                    <IconButton icon={List}/>
                </LoggedLink>
            </div>

            {
                showings.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {showings.map((showing) => (
                            <TheatreScreenScheduleCard key={showing._id} showing={showing}/>
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