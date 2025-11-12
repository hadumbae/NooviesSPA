import {FC} from 'react';
import {
    MovieCreditDetailsExceptPersonGroupedByRoleArray
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import PersonDetailsCreditMovieDialog
    from "@/pages/persons/components/admin/person-details/credit-overview/PersonDetailsCreditMovieDialog.tsx";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

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

            return (
                <section key={`${roleName}-${department}`}>
                    <SectionHeader srOnly={true}>Grouped by Role Type : {roleName}</SectionHeader>

                    <h1 className="font-bold">{roleName}</h1>

                    <div>
                        {credits.map(credit => {
                            const {_id, movie, characterName} = credit;
                            const {title: movieTitle, releaseDate, posterImage} = movie;

                            const roleDisplay = department === "CAST" ? characterName : roleName;
                            const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";

                            return (
                                <Card key={_id}>
                                    <CardContent className="py-4 px-3 flex items-center space-x-2">

                                        {/* Poster Image */}

                                        <div>
                                            <MoviePosterImage src={posterImage?.secure_url}/>
                                        </div>

                                        {/* Credit Information */}

                                        <div className="flex-1 min-w-0 flex flex-col space-y-2 justify-center">
                                            <h1 className="text-base font-bold truncate">{movieTitle}</h1>
                                            <span className="text-sm text-neutral-400 truncate">{roleDisplay}</span>
                                        </div>

                                        {/* Movie Dialog */}

                                        <div className="flex space-x-2 items-center justify-end">
                                            <span className="text-xs text-neutral-400">{releaseYear}</span>

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
                </section>
            );
        })
    );
};

export default PersonDetailsCreditList;
