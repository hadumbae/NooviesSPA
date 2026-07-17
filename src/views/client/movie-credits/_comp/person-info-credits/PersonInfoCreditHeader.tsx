/**
 * @fileoverview Header component for displaying movie titles and release years within a person's credit list.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {DateTime} from "luxon";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the PersonInfoCreditHeader component. */
type HeaderProps = {
    movieTitle: string;
    movieSlug: string;
    releaseDate?: DateTime | null;
    classNames?: {
        container?: string;
        title?: string;
        date?: string;
    };
};

/**
 * Displays the title and formatted release year of a movie credit.
 */
export function PersonInfoCreditHeader(
    {movieSlug, movieTitle, releaseDate, classNames}: HeaderProps
): ReactElement {
    const formattedReleaseDate = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    return (
        <div className={classNames?.container}>
            <LoggedLink to={`/browse/movies/${movieSlug}`} className={cn(
                "primary-text font-oswald hover:underline hover:underline-offset-4",
                "max-md:font-semibold max-md:tracking-tight",
                "md:font-extrabold md:text-xl",
                classNames?.title
            )}>
                {movieTitle}
            </LoggedLink>

            <p className={cn(
                "secondary-text text-sm font-oswald font-bold",
                classNames?.date
            )}>
                {formattedReleaseDate}
            </p>
        </div>
    );
}