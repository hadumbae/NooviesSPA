/** @fileoverview Header component for a movie credit card, displaying person identity and role summary. */

import {ReactElement, useState} from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {
    MoviePersonDetailsCardToggles
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardToggles.tsx";
import {RoleTypeDepartment} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema.ts";
import {simplifyMovieCreditDetails} from "@/domains/movie-credits/_feat/formatters/simplifyMovieCreditDetails.ts";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";
import {Ellipsis} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {
    MoviePersonDetailsCardActions
} from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardActions.tsx";

/** Props for the MoviePersonDetailsCardHeader component. */
type HeaderProps = {
    department: RoleTypeDepartment;
    credit: MovieCreditDetails;
};

/**
 * Renders the top section of a credit card including person name, role/character, and action toggles.
 */
export function MoviePersonDetailsCardHeader(
    {department, credit}: HeaderProps
): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const {characterName, person: {name: personName}, roleType: {roleName}} = credit;
    const simplifiedCredit = simplifyMovieCreditDetails(credit);

    const creditDesc = department === "CAST" ? characterName : roleName;

    return (
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span>{personName}</span>

                <MoviePersonDetailsCardToggles setEdit={setIsEditing} setDelete={setIsDeleting}>
                    <Button variant="outline" className="dark:hover:border dark:hover:border-gray-400">
                        <Ellipsis/>
                    </Button>
                </MoviePersonDetailsCardToggles>
            </CardTitle>
            <CardDescription>{creditDesc}</CardDescription>

            <MoviePersonDetailsCardActions
                className="hidden"
                credit={simplifiedCredit}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
            />
        </CardHeader>
    );
}