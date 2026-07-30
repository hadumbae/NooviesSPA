import {ReactElement} from "react";
import {UserDetails} from "@/domains/users";
import {cn} from "@/common/_feat";
import {buttonVariants, Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {Link} from "react-router-dom";
import {Search} from "lucide-react";
import {CustomerUniqueCodeDisplay} from "@/views/admin/customers";
import {StatNumberItem} from "@/views/common/_comp";

type CardClassNames = {
    card?: string;
    content?: string;
};

type CardProps = {
    customer: UserDetails;
    classNames?: CardClassNames;
};

export function CustomerIndexCard(
    {customer, classNames}: CardProps
): ReactElement {
    const {_id, name, email, uniqueCode, reviewCount, reservationCount, activeReservationCount} = customer;

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-4", classNames?.content)}>
                <div>
                    <h2 className="primary-text font-bold">{name}</h2>
                    <h3 className="secondary-text text-sm font-bold">{email}</h3>
                </div>

                <Separator/>

                <CustomerUniqueCodeDisplay
                    customerID={_id}
                    uniqueCode={uniqueCode}
                />

                <Separator/>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center space-x-2">
                        <StatNumberItem text="Reviews" count={reviewCount}/>
                        <StatNumberItem text="Reservations" count={reservationCount}/>
                        <StatNumberItem text="Active" count={activeReservationCount} classNames={{
                            number: "text-yellow-700 dark:text-yellow-500"
                        }}/>
                    </div>

                    <Link
                        className={cn("text-with-icon", buttonVariants({size: "sm", variant: "outline"}))}
                        to={`/admin/customers/${customer._id}`}
                    >
                        <Search/> Details
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}