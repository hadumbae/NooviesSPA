/**
 * @fileoverview Displays a cast member avatar with linked identity and role details.
 */

import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {cn} from "@/common/lib/utils.ts";
import {mapCreditToPersonLinkConfig} from "@/domains/movie-credits/_feat/navigation/mapCreditToPersonLinkConfig.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ReactElement} from "react";

/** Props for the ActorCreditAvatar component. */
type ActorCreditAvatarProps = {
    className?: string;
    credit: Extract<MovieCreditDetails, { department: "CAST" }>;
};

/**
 * Linked actor avatar displaying the person's name and their character role.
 */
export function ActorCreditAvatar({credit, className}: ActorCreditAvatarProps): ReactElement {
    const {person: {name, profileImage}, characterName, creditedAs} = credit;
    const {to: linkTo, context: linkCtx} = mapCreditToPersonLinkConfig({credit});

    const displayName = creditedAs ?? name;
    const initials = getInitials(displayName);

    return (
        <div className="flex items-center max-lg:flex-col max-lg:space-y-2 lg:space-x-4">
            <LoggedLink to={linkTo} context={linkCtx}>
                <Avatar className={cn("h-32 w-32 lg:h-24 lg:w-24", className)}>
                    <AvatarImage src={profileImage?.secure_url} alt={displayName}/>
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </LoggedLink>

            <div className="flex flex-col max-lg:items-center space-y-1">
                <LoggedHoverLink to={linkTo} context={linkCtx} className="font-bold max-md:text-sm">
                    {displayName}
                </LoggedHoverLink>

                <span className="secondary-text text-sm">
                    {characterName}
                </span>
            </div>
        </div>
    );
}