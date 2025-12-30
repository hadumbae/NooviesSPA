/**
 * @file ActorCreditAvatar.tsx
 *
 * @summary
 * Displays a cast member avatar with name and character information.
 *
 * @description
 * Renders a visual representation of a **CAST** movie credit, including:
 * - Person avatar image (or initials fallback)
 * - Actor’s credited/display name
 * - Character name
 *
 * Both the avatar and the actor name link to the person’s detail page,
 * with structured logging context derived from the credit metadata.
 *
 * Intended for use in cast grids, carousels, or overview sections.
 */

import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {cn} from "@/common/lib/utils.ts";
import mapCreditToPersonLinkConfig from "@/pages/moviecredit/utility/mapCreditToPersonLinkConfig.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for {@link ActorCreditAvatar}.
 */
type AvatarProps = {
    /** Optional CSS class applied to the avatar element */
    className?: string;

    /**
     * CAST credit used to render actor information.
     *
     * Restricted to `department: "CAST"` to ensure
     * character-related fields are available.
     */
    credit: Extract<MovieCreditDetails, {department: "CAST"}>;
};

/**
 * Renders an actor avatar with name and character label.
 *
 * @remarks
 * - Uses `creditedAs` when available, falling back to the person’s name
 * - Generates initials for avatar fallback rendering
 * - Navigation events are logged via {@link LoggedLink}
 *
 * @param props - {@link AvatarProps}
 * @returns Actor avatar with linked name and character
 */
const ActorCreditAvatar = ({credit, className}: AvatarProps) => {
    const {person: {name, profileImage}, characterName, creditedAs} = credit;
    const linkConfig = mapCreditToPersonLinkConfig({credit});

    const displayName = creditedAs ?? name;
    const initials = getInitials(displayName);

    return (
        <div className="flex flex-col items-center space-y-2">
            <LoggedLink to={linkConfig.to} context={linkConfig.context}>
                <Avatar
                    className={cn(
                        "h-32 w-32",
                        className,
                    )}
                >
                    <AvatarImage
                        src={profileImage?.secure_url}
                        alt={displayName}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </LoggedLink>

            <div className="flex flex-col items-center space-y-1">
                <LoggedLink
                    to={linkConfig.to}
                    context={linkConfig.context}
                    className={cn(
                        PrimaryTextBaseCSS,
                        "hover:underline underline-offset-4 font-bold",
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
