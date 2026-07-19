/**
 * @fileoverview Component for displaying boolean attribute flags for movie cast credits.
 */

import {ReactElement} from "react";
import {CastMovieCredit, MovieCreditDetailsCast, PersonCastCredit} from "@/domains/movie-credits";
import {Badge} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";

/** Props for the MovieCreditCastFlags component. */
type FlagProps = {
    credit: CastMovieCredit | PersonCastCredit | MovieCreditDetailsCast;
    classNames?: { container?: string, badge?: string };
};

/** Renders a collection of badges representing specific attributes of a cast credit. */
export function MovieCreditCastFlags(
    {credit, classNames}: FlagProps
): ReactElement | null {
    const flags = [
        // ["Is Primary", credit.isPrimary], <-- Actor/Supporting Actor
        ["Voice Only", credit.voiceOnly],
        ["Cameo", credit.cameo],
        ["Motion Capture", credit.motionCapture],
        ["Archive Footage", credit.archiveFootage],
    ].filter(([, active]) => active) as [string, boolean][];

    if (flags.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-wrap space-x-2", classNames?.container)}>
            {flags.map(([label]) => (
                <Badge key={label} variant="default" className={classNames?.badge}>
                    {label}
                </Badge>
            ))}
        </div>
    );
}