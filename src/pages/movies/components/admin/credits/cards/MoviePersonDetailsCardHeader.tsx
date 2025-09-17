import {FC} from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import MovieCreditOptions from "@/pages/moviecredit/components/MovieCreditOptions.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import simplifyMovieCreditDetails from "@/pages/moviecredit/utility/simplifyMovieCreditDetails.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";

/**
 * Props for {@link MoviePersonDetailsCardHeader}.
 *
 * @interface HeaderProps
 */
type HeaderProps = {
    /**
     * The department of the credit, either "CAST" or "CREW".
     * Determines which fields are displayed in the card header.
     */
    department: RoleTypeDepartment;

    /**
     * The details of the movie credit to display.
     *
     * Includes person name, role type, and optionally character name.
     */
    credit: MovieCreditDetails;
};

/**
 * Component that renders the header section of a movie credit card.
 *
 * Displays the person’s name, role/character name, and an options menu.
 * Adjusts the displayed description based on the `department`:
 * - `CREW`: shows the role name.
 * - `CAST`: shows the character name.
 *
 * Automatically provides default `onSubmit` options for editing the credit,
 * disabling the "department" and "movie" fields.
 *
 * @component
 * @param {HeaderProps} props - Props including the credit department and credit details.
 *
 * @returns A JSX element representing the card header for a movie credit.
 *
 * @remarks
 * - Uses {@link CardHeader}, {@link CardTitle}, and {@link CardDescription} for layout.
 * - Uses {@link MovieCreditOptions} for the dropdown menu with edit options.
 * - Validates `department` and logs an error to the console if an invalid value is provided.
 * - Displays an error message in the UI if `department` is not `CAST` or `CREW`.
 *
 * @example
 * ```tsx
 * <MoviePersonDetailsCardHeader
 *   department="CAST"
 *   credit={{
 *     person: { name: "John Doe", _id: "123" },
 *     roleType: { roleName: "Lead Actor", _id: "456" },
 *     characterName: "Hero",
 *     _id: "789"
 *   }}
 * />
 * ```
 */
const MoviePersonDetailsCardHeader: FC<HeaderProps> = ({department, credit}) => {
    const {characterName, person: {name: personName}, roleType: {roleName}} = credit;
    const simpleCredit = simplifyMovieCreditDetails(credit);

    const onSubmitProps: FormOptions<MovieCreditFormValues> = {
        disableFields: ["department", "movie"]
    };

    if (department === "CREW") {
        return (
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{personName}</span>
                    <MovieCreditOptions onSubmit={onSubmitProps} entity={simpleCredit}/>
                </CardTitle>
                <CardDescription>{roleName}</CardDescription>
            </CardHeader>
        );
    }

    if (department === "CAST") {
        return (
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{personName}</span>
                    <MovieCreditOptions onSubmit={onSubmitProps} entity={simpleCredit}/>
                </CardTitle>
                <CardDescription>{characterName}</CardDescription>
            </CardHeader>
        );
    }

    console.group("Component Error");
    console.error("Component Error: Invalid Parameter");
    console.error("Expected value: `CAST` | `CREW`");
    console.error("Received value: ", department);
    console.groupEnd();

    return (
        <span className="text-red-500">
            INVALID CREDIT DEPARTMENT
        </span>
    );
};

export default MoviePersonDetailsCardHeader;
