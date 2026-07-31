/**
 * @fileoverview Breadcrumb navigation components for the customer reservation detail administrative view.
 */

import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/views/common/_comp/ui";
import {ObjectId} from "@/common/_schemas";
import {ReservationUniqueCode} from "@/domains/reservations";

/** Props for the CustomerReservationPageBreadcrumbs component. */
type BreadcrumbProps = {
    customerID: ObjectId;
    customerName: string;
    customerCode: UserUniqueCode;
    reservationCode: ReservationUniqueCode;
};

/**
 * Renders the hierarchical breadcrumb navigation trail for a specific customer reservation details page.
 */
export function CustomerReservationPageBreadcrumbs(
    {customerID, customerName, customerCode, reservationCode}: BreadcrumbProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumb">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers`}
                        >
                            Customers
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerID}`}
                        >
                            {customerName} • {customerCode}
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerID}/reservations`}
                        >
                            Reservations
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {reservationCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}