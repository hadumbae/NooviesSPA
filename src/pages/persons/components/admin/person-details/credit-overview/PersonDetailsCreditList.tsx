import {FC} from 'react';
import {
    MovieCreditDetailsExceptPersonGroupedByRoleArray
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import {format} from "date-fns";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import PersonDetailsCreditMovieDialog
    from "@/pages/persons/components/admin/person-details/credit-overview/PersonDetailsCreditMovieDialog.tsx";

type AccordionListProps = {
    /** The full name of the person whose credits are being displayed. */
    personName: string;

    /** The department of the credits being displayed, either "CAST" or "CREW". */
    department: RoleTypeDepartment;

    /**
     * Array of credits grouped by role type.
     * Each element contains a role name and an array of credits associated with that role.
     */
    roleTypeList: MovieCreditDetailsExceptPersonGroupedByRoleArray;
}

/**
 * Renders a list of a person's movie credits grouped by role type within a department.
 *
 * Each role type group displays a section header with the role name and a card for each credit.
 * - CAST credits show the character name.
 * - CREW credits show the role name.
 *
 * Each credit card includes:
 * - Movie title (with original title if different)
 * - Role or character
 * - Release year
 * - A dialog trigger to view more details about the movie credit
 *
 * @example
 * <PersonDetailsCreditList
 *   personName="Jane Doe"
 *   department="CAST"
 *   roleTypeList={[{ roleName: "Lead", credits: [...] }, { roleName: "Supporting", credits: [...] }]}
 * />
 */
const PersonDetailsCreditList: FC<AccordionListProps> = ({personName, department, roleTypeList}) => {
    return (
        roleTypeList.map((roleTypeGroup) => {
            const {roleName, credits} = roleTypeGroup;

            return <section key={`${roleName}-${department}`}>
                <h1>{roleName}</h1>

                <div>
                    {credits.map(credit => {
                        const {_id, movie, characterName} = credit;
                        const {title: movieTitle, originalTitle, releaseDate} = movie;

                        const roleDisplay = department === "CAST" ? characterName : roleName;
                        const formattedReleaseDate = releaseDate && format(releaseDate, "yyyy");
                        const displayTitle = movieTitle === originalTitle
                            ? movieTitle
                            : `${movieTitle} (${originalTitle})`;

                        return (
                            <Card key={_id}>
                                <CardContent className="py-4 px-3 flex items-center">
                                    <div className="flex-grow">
                                        <h1 className="text-lg font-bold">{displayTitle}</h1>
                                        <span className="text-sm text-neutral-400">{roleDisplay}</span>
                                    </div>

                                    <div className="flex space-x-2 items-center">
                                        <span className="text-xs text-neutral-400">
                                            {formattedReleaseDate}
                                        </span>

                                        <PersonDetailsCreditMovieDialog
                                            personName={personName}
                                            credit={credit}
                                            movie={movie}
                                        >
                                            <Info className="text-blue-200 hover:text-blue-500"/>
                                        </PersonDetailsCreditMovieDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>;
        })
    );
};

export default PersonDetailsCreditList;
