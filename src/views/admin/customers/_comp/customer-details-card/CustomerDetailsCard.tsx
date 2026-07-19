/**
 * @fileoverview Administrative data card displaying primary customer account details.
 */

import {LeanUserWithEmail} from "@/domains/users/_schema/user";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";
import {LabelContent} from "@/views/common/_comp";

/** Props for the CustomerDetailsCard component. */
type CardProps = {
    customer: LeanUserWithEmail;
};

/** Renders a structured overview of a customer's account information. */
export function CustomerDetailsCard(
    {customer: {_id, name, uniqueCode, email}}: CardProps
): ReactElement {
    return (
        <Card className="shadow-sm">
            <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <LabelContent classNames={{container: "max-md:col-span-2"}} label="Database ID">
                        <span className="text-sm font-mono break-all">{_id}</span>
                    </LabelContent>

                    <LabelContent label="Full Name">
                        <span className="text-sm font-semibold">{name}</span>
                    </LabelContent>

                    <LabelContent label="Email Address">
                        <span className="text-sm truncate" title={email}>
                            {email}
                        </span>
                    </LabelContent>
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
}