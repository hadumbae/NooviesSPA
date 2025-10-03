import {FC} from 'react';
import {
    MovieCreditDetailsExceptPersonGroupedByRoleArray
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import PersonDetailsCreditList
    from "@/pages/persons/components/admin/person-details/credit-overview/PersonDetailsCreditList.tsx";

type OverviewProps = {
    /** The full name of the person whose credits are being displayed. */
    personName: string;

    /**
     * An array of the person's movie credits grouped by role type and department.
     * Typically, includes both 'CAST' and 'CREW' roles.
     */
    creditsByRole: MovieCreditDetailsExceptPersonGroupedByRoleArray;
}

/**
 * Component for displaying an overview of a person's movie credits.
 *
 * Organizes credits into two sections: CAST and CREW. If no credits exist, it
 * renders a placeholder message. Each section internally uses
 * `PersonDetailsCreditList` to render the detailed list of credits.
 *
 * @example
 * <PersonDetailsCreditOverview
 *   personName="John Doe"
 *   creditsByRole={[{ department: "CAST", credits: [...] }, { department: "CREW", credits: [...] }]}
 * />
 */
const PersonDetailsCreditOverview: FC<OverviewProps> = ({personName, creditsByRole}) => {
    const hasNoCredits = creditsByRole.length === 0;

    if (hasNoCredits) {
        return <section className="h-32 flex justify-center items-center">
            <h1 className="sr-only">"Person : No Credits"</h1>
            <span className="text-neutral-400 select-none">There Are No Credits</span>
        </section>
    }

    const crewCredits = creditsByRole.filter(role => role.department === "CREW");
    const castCredits = creditsByRole.filter(role => role.department === "CAST");

    return (
        <div className="space-y-4">
            {
                castCredits.length > 0 &&
                <section className="space-y-4">
                    <h1 className="sr-only">{personName} : CAST Credits</h1>

                    <PersonDetailsCreditList
                        department="CAST"
                        personName={personName}
                        roleTypeList={castCredits}
                    />
                </section>
            }

            {
                crewCredits.length > 0 &&
                <section className="space-y-4">
                    <h1 className="sr-only">{personName} : CREW Credits</h1>

                    <PersonDetailsCreditList
                        department="CREW"
                        personName={personName}
                        roleTypeList={crewCredits}
                    />
                </section>
            }
        </div>
    );
};

export default PersonDetailsCreditOverview;
