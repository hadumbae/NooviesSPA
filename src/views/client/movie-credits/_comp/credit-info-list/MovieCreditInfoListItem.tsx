/**
 * @fileoverview List item component for displaying a movie credit entry.
 */

import {cn} from "@/common/_feat";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {PersonProfileAvatar} from "@/views/admin/persons/_comp/person-details";
import {CreditExceptMovie} from "@/domains/movie-credits";
import {ReactElement} from "react";

/** Props for the MovieCreditInfoListItem component. */
type ItemProps = {
    hideAvatar?: boolean;
    credit: CreditExceptMovie;
    className?: string;
}

/** Renders a movie credit list item with person and role information. */
export function MovieCreditInfoListItem(
    {className, credit, hideAvatar}: ItemProps
): ReactElement {
    const {department, displayRoleName, characterName, person, roleType, creditedAs, uncredited} = credit;
    const {name: personName, slug: personSlug, profileImage} = person;

    const displayText = department === "CAST"
        ? buildString([characterName, uncredited && "(uncredited)"])
        : displayRoleName ?? roleType.roleName;

    return (
        <li className={cn(className, "primary-text flex items-center space-x-5 px-4 py-2")}>
            {!hideAvatar && (
                <LoggedLink to={`/browse/persons/${personSlug}`}>
                    <PersonProfileAvatar name={personName} imageLink={profileImage?.secure_url}/>
                </LoggedLink>
            )}

            <LoggedLink className="w-48 md:w-64" to={`/browse/persons/${personSlug}`}>
                <span className="text-sm md:text-base font-bold hover:underline underline-offset-4">
                    {creditedAs ?? personName}
                </span>
            </LoggedLink>

            <div className="flex-1">
                <span className="text-sm md:text-base">
                    {displayText}
                </span>
            </div>
        </li>
    );
}