/**
 * @file Displays a cast member avatar with linked identity and role details.
 * @filename ActorCreditAvatar.tsx
 */

import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/movie-credit-schema/MovieCredit.types.ts";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {cn} from "@/common/lib/utils.ts";
import mapCreditToPersonLinkConfig from "@/pages/moviecredit/utility/mapCreditToPersonLinkConfig.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Component props.
 */
type ActorCreditAvatarProps = {
    /** Additional CSS classes applied to the avatar */
    className?: string;

    /** Cast credit containing actor identity and character metadata */
    credit: Extract<MovieCreditDetails, { department: "CAST" }>;
};

/**
 * Renders a linked actor avatar with display name and character label.
 */
const ActorCreditAvatar = ({credit, className}: ActorCreditAvatarProps) => {
    const {person: {name, profileImage}, characterName, creditedAs} = credit;
    const linkConfig = mapCreditToPersonLinkConfig({credit});

    const displayName = creditedAs ?? name;
    const initials = getInitials(displayName);

    return (
        <div className={cn(
            "flex items-center",
            "max-lg:flex-col max-lg:space-y-2",
            "lg:space-x-4",
        )}>
            <LoggedLink to={linkConfig.to} context={linkConfig.context}>
                <Avatar className={cn(
                    "h-32 w-32",
                    "lg:h-24 lg:w-24",
                    className
                )}>
                    <AvatarImage src={profileImage?.secure_url} alt={displayName}/>
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </LoggedLink>

            <div className="flex flex-col max-lg:items-center space-y-1">
                <LoggedLink
                    to={linkConfig.to}
                    context={linkConfig.context}
                    className={cn(
                        PrimaryTextBaseCSS,
                        "hover:underline underline-offset-4 font-bold",
                        "max-md:text-sm"
                    )}
                >
                    {displayName}
                </LoggedLink>

                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {characterName}
                </span>
            </div>
        </div>
    );
};

export default ActorCreditAvatar;