import { FC } from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import { Plus } from "lucide-react";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import { buttonVariants } from "@/common/components/ui/button.tsx";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";

/**
 * @fileoverview
 * Displays the header section for the **Showings** index page.
 *
 * @description
 * This component renders a simple page header containing:
 * - A title and subtitle describing the page purpose.
 * - A "Create" button that navigates to the showing creation form.
 *
 * The layout aligns the title section and button horizontally using
 * Flexbox, maintaining consistent spacing and typography styling
 * with the rest of the admin interface.
 *
 * ---
 *
 * ### Rendered Structure
 * ```html
 * <header>
 *   <section>
 *     <HeaderTitle>Showings</HeaderTitle>
 *     <HeaderSubtitle>The showings of movies at theatres.</HeaderSubtitle>
 *   </section>
 *   <LoggedLink>+ Create</LoggedLink>
 * </header>
 * ```
 *
 * @component
 * @returns {JSX.Element} A styled header with the page title, subtitle, and a navigation button.
 *
 * @example
 * ```tsx
 * import ShowingIndexHeader from "@/pages/showings/components/ShowingIndexHeader.tsx";
 *
 * const Page = () => (
 *   <>
 *     <ShowingIndexHeader />
 *     <ShowingList />  // rest of the page
 *   </>
 * );
 * ```
 */
const ShowingIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <section className="space-y-2">
                <HeaderTitle>Showings</HeaderTitle>
                <HeaderSubtitle className="text-xs">
                    The showings of movies at theatres.
                </HeaderSubtitle>
            </section>

            <LoggedHoverLink
                className={buttonVariants({ variant: "link" })}
                to="/admin/showings/create"
                message="Navigate to Showing Create."
            >
                <Plus /> Create
            </LoggedHoverLink>
        </header>
    );
};

export default ShowingIndexHeader;
