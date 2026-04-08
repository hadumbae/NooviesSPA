/**
 * @file Administrative data card displaying primary customer account details.
 * @filename CustomerDetailsCard.tsx
 */

import {LeanUserWithEmail} from "@/domains/users/schemas/user";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the CustomerDetailsCard component.
 */
type CardProps = {
    /** The hydrated user object containing core identification and contact data. */
    customer: LeanUserWithEmail;
};

/**
 * Renders a structured overview of a customer's account information.
 * ---
 */
export const CustomerDetailsCard = (
    {customer}: CardProps
) => {
    const {
        _id,
        name,
        uniqueCode,
        email,
    } = customer;

    return (
        <Card className="shadow-sm">
            <CardContent className="p-4 space-y-4">
                {/* Primary Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <LabeledGroup
                        className="max-md:col-span-2"
                        orientation="vertical"
                        label="Database ID"
                    >
                        <span className="text-sm font-mono break-all">{_id}</span>
                    </LabeledGroup>

                    <LabeledGroup orientation="vertical" label="Full Name">
                        <span className="text-sm font-semibold">{name}</span>
                    </LabeledGroup>

                    <LabeledGroup orientation="vertical" label="Email Address">
                        <span className="text-sm truncate" title={email}>
                            {email}
                        </span>
                    </LabeledGroup>
                </div>

                <Separator/>

                <div className="flex flex-col items-center justify-center py-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                        Customer Access Code
                    </span>

                    <LoggedLink to={`/admin/customers/${uniqueCode}/profile`}>
                        <h4 className={cn(
                            "text-xl font-extrabold font-oswald tracking-wider text-primary",
                            "hover:underline hover:underline-offset-8"
                        )}>
                            {uniqueCode}
                        </h4>
                    </LoggedLink>
                </div>
            </CardContent>
        </Card>
    );
};