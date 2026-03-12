/**
 * @file List item component for displaying a movie credit entry.
 * @filename MovieCreditInfoListItem.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import MovieCreditInfoListItemText from "@/features/client/movie-credits/lists/MovieCreditInfoListItemText.tsx";
import {CreditExceptMovie} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import PersonProfileAvatar from "@/features/admin/persons/display/PersonProfileAvatar.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for {@link MovieCreditInfoListItem}.
 */
type ItemProps = {
    /** Credit displayed by the list item */
    credit: CreditExceptMovie;

    /** Optional CSS classes applied to the list item */
    className?: string;
}

/**
 * Renders a movie credit list item with person and role information.
 */
const MovieCreditInfoListItem = (
    {className, credit}: ItemProps
) => {
    const {department, displayRoleName, characterName, person, roleType, creditedAs} = credit;
    const {name: personName, slug: personSlug, profileImage} = person;

    const displayText = department === "CAST"
        ? characterName
        : displayRoleName ?? roleType.roleName;

    return (
        <li className={cn(className, "flex items-center space-x-5 px-4 py-2")}>
            <LoggedLink to={`/browse/persons/${personSlug}`}>
                <PersonProfileAvatar
                    name={personName}
                    imageLink={profileImage?.secure_url}
                />
            </LoggedLink>

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