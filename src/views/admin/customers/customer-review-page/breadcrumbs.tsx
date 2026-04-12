/**
 * @file Navigation breadcrumbs for the administrative Customer Review detail page.
 * @filename CustomerReviewPageBreadcrumbs.tsx
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for the CustomerReviewPageBreadcrumbs component.
 */
type BreadcrumbProps = {
    /** The validated unique code of the customer to link back to their profile. */
    customerCode: UserUniqueCode;
    /** The validated unique code of the specific review for display in the current page label. */
    reviewCode: MovieReviewUniqueCode;
};

/**
 * Provides hierarchical navigation trails for administrative review moderation.
 * ---
 */
export const CustomerReviewPageBreadcrumbs = (
    {customerCode, reviewCode}: BreadcrumbProps
) => {
    return (
        <nav aria-label="Breadcrumb">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/profile`}
                        >
                            Customer Profile
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/reviews`}
                        >
                            Reviews
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Review {reviewCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
};