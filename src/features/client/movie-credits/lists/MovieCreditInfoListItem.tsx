/**
 * @file List item component for displaying a movie credit entry.
 * @filename MovieCreditInfoListItem.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import MovieCreditInfoListItemText from "@/features/client/movie-credits/lists/MovieCreditInfoListItemText.tsx";
import {CreditExceptMovie} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import PersonProfileAvatar from "@/features/admin/persons/display/PersonProfileAvatar.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import buildString from "@/common/utility/buildString.ts";

/**
 * Props for {@link MovieCreditInfoListItem}.
 */
type ItemProps = {
    /** Whether the person avatar should be hidden */
    hideAvatar?: boolean;

    /** Credit displayed by the list item */
    credit: CreditExceptMovie;

    /** Optional CSS classes applied to the list item */
    className?: string;
}

/**
 * Renders a movie credit list item with person and role information.
 */
const MovieCreditInfoListItem = (
    {className, credit, hideAvatar}: ItemProps
) => {
    const {department, displayRoleName, characterName, person, roleType, creditedAs, uncredited} = credit;
    const {name: personName, slug: personSlug, profileImage} = person;

    const displayText = department === "CAST"
        ? buildString([characterName, uncredited && "(uncredited)"])
        : displayRoleName ?? roleType.roleName;

    return (
        <li className={cn(className, "flex items-center space-x-5 px-4 py-2")}>
            {
                !hideAvatar && (
                    <LoggedLink to={`/browse/persons/${personSlug}`}>
                        <PersonProfileAvatar
                            name={personName}
                            imageLink={profileImage?.secure_url}
                        />
                    </LoggedLink>
                )
            }

            <LoggedLink className="w-48 md:w-64" to={`/browse/persons/${personSlug}`}>
                <MovieCreditInfoListItemText
                    className="font-bold hover:underline underline-offset-4"
                >
                    {creditedAs ?? personName}
                </MovieCreditInfoListItemText>
            </LoggedLink>

            <div className="flex-1">
                <MovieCreditInfoListItemText>
                    {displayText}
                </MovieCreditInfoListItemText>
            </div>
        </li>
    );
};

export default MovieCreditInfoListItem;