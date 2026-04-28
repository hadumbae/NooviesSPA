/**
 * @fileoverview UI component for rendering a person's movie credits grouped by professional role.
 */

import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import PersonDetailsCreditMovieDialog
    from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditMovieDialog.tsx";
import {PersonFilmography} from "src/domains/moviecredit/_feat/person-credit";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";

/**
 * Props for the PersonDetailsCreditList component.
 */
type AccordionListProps = {
    personName: string;
    department: RoleTypeDepartment;
    roleTypeList: PersonFilmography;
}

/**
 * Renders a categorized list of a person's credits.
 */
const PersonDetailsCreditList: FC<AccordionListProps> = ({personName, department, roleTypeList}) => {
    return (
        roleTypeList.map((roleGroup) => {
            const {role, topCredits} = roleGroup;

            return (
                <section key={`${role}-${department}`} className="space-y-2">
                    <SROnly>Grouped by Role Type : {role}</SROnly>

                    <h1 className="primary-text subsection-title">{role}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {topCredits.map(credit => {
                            const {_id, movie} = credit;
                            const {title: movieTitle, releaseDate, posterImage} = movie;

                            const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";

                            const roleDisplay = department === "CAST"
                                ? credit.characterName
                                : credit.roleType.roleName;

                            return (
                                <Card key={_id}>
                                    <CardContent className="py-4 px-3 flex items-center space-x-2">

                                        <div>
                                            <MoviePosterImageDialog src={posterImage?.secure_url}/>
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col space-y-2 justify-center">
                                            <h1 className="text-base font-bold truncate">{movieTitle}</h1>
                                            <span className="text-sm text-neutral-400 truncate">{roleDisplay}</span>
                                        </div>

                                        <div className="flex space-x-2 items-center justify-end">
                                            <span className="secondary-text text-xs font-bold select-none">
                                                {releaseYear}
                                            </span>

                                            <PersonDetailsCreditMovieDialog
                                                personName={personName}
                                                credit={credit}
                                                movie={movie}
                                            >
                                                <Info className="text-blue-200 hover:text-blue-500 cursor-pointer"/>
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