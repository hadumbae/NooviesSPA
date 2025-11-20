import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import PersonSubmitFormPanel from "@/pages/persons/components/form/admin/submit/PersonSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * **Person Index Header**
 *
 * Header component for the *Persons Index Page*, displaying contextual information and
 * an entry point for creating new person records (actors, directors, or crew).
 *
 * @remarks
 * - Provides a clean, minimal layout optimized for list pages.
 * - Displays a **title** and **description** introducing the section.
 * - Includes a **Create** button that opens a modal form (via {@link PersonSubmitFormPanel})
 *   for submitting a new person.
 * - On successful form submission, the user is navigated to the newly created person’s detail page.
 *
 * @layout
 * - **Desktop (`md:`)**: Title/description on the left, action button on the right.
 * - **Mobile (`max-md:`)**: Elements stack vertically with spacing.
 *
 * @behavior
 * - Navigation uses {@link useLoggedNavigate} to track transitions for audit or debug logging.
 * - Button styling uses the `link` variant for lightweight UI emphasis.
 *
 * @example
 * ```tsx
 * // Rendered at the top of the Persons index page
 * <PersonIndexHeader />
 * ```
 *
 * @see {@link PersonSubmitFormPanel} — Modal form component for creating a new person.
 * @see {@link useLoggedNavigate} — Hook for navigation with structured logging.
 */
const PersonIndexHeader: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Handles navigation after successfully creating a person entry.
     *
     * @param person - The created {@link Person} object returned from the submission.
     * @remarks
     * Invokes {@link useLoggedNavigate} with contextual metadata for structured logging.
     */
    const onSubmit = (person: Person) => {
        navigate({
            level: "log",
            to: `/admin/persons/get/${person._id}`,
            component: PersonIndexHeader.name,
            message: "Navigate to details after creating person."
        });
    };

    return (
        <header
            className={cn(
                "flex",
                "justify-between items-center",
            )}
        >
            {/* Page title and description */}
            <section>
                <HeaderTitle>Persons</HeaderTitle>
                <HeaderDescription>
                    The actors and crew behind movies.
                </HeaderDescription>
            </section>

            {/* Call-to-action: opens modal form for creating new person */}
            <PersonSubmitFormPanel onSubmitSuccess={onSubmit}>
                <Button
                    variant="link"
                    className={HoverLinkCSS}
                >
                    <Plus /> Create
                </Button>
            </PersonSubmitFormPanel>
        </header>
    );
};

export default PersonIndexHeader;
