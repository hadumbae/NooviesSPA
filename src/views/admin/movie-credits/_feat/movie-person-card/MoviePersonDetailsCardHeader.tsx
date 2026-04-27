/** @fileoverview Header component for a movie credit card, displaying person identity and role summary. */

import {ReactElement, useState} from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {MoviePersonDetailsCardHeaderToggles}
    from "@/views/admin/movie-credits/_feat/movie-person-card/MoviePersonDetailsCardHeaderToggles.tsx";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import simplifyMovieCreditDetails from "@/domains/moviecredit/_feat/formatters/simplifyMovieCreditDetails.ts";

import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {MovieCreditForm, MovieCreditFormPanel} from "@/views/admin/movie-credits/_comp/forms";
import {
    MovieCreditDeleteWarningDialog
} from "@/views/admin/movie-credits/_feat/delete-credit/MovieCreditDeleteWarningDialog.tsx";
import {Ellipsis} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";

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

    const {_id, characterName, person: {name: personName}, roleType: {roleName}} = credit;
    const simpleCredit = simplifyMovieCreditDetails(credit);

    const creditDesc = department === "CAST" ? characterName : roleName;

    return (
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span>{personName}</span>
                <MoviePersonDetailsCardHeaderToggles setEdit={setIsEditing} setDelete={setIsDeleting}>
                    <Button variant="outline" className="dark:hover:border dark:hover:border-gray-400">
                        <Ellipsis/>
                    </Button>
                </MoviePersonDetailsCardHeaderToggles>
            </CardTitle>
            <CardDescription>{creditDesc}</CardDescription>

            <div className="hidden">
                <MovieCreditForm editEntity={simpleCredit}>
                    <MovieCreditFormPanel
                        disableFields={{person: true}}
                        isOpen={isEditing}
                        setIsOpen={setIsEditing}
                    />
                </MovieCreditForm>

                <MovieCreditDeleteWarningDialog
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    _id={_id}
                />
            </div>
        </CardHeader>
    );
}