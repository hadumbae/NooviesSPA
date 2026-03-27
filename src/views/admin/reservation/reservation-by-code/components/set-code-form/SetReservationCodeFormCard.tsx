/**
 * @file Card-based UI component for the reservation code lookup form.
 * @filename SetReservationCodeFormCard.tsx
 */

import {useFormContext} from "react-hook-form";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    SetReservationCodeFormContext
} from "@/domains/reservation/views/admin/reservation-by-code/context/SetReservationCodeFormContext.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link SetReservationCodeFormCard} component.
 */
type ViewProps = {
    /** Optional additional CSS classes for the card content container. */
    className?: string;
};

/**
 * A styled card containing the input and submission trigger for reservation lookups.
 */
export const SetReservationCodeFormCard = (
    {className}: ViewProps
) => {
    const {control} = useFormContext();

    const {formID} = useRequiredContext({
        context: SetReservationCodeFormContext,
    });

    return (
        <Card>
            <CardContent className={cn(
                "p-3 flex flex-col space-y-2",
                className,
            )}>
                <HookFormInput
                    placeholder="Code"
                    name="code"
                    control={control}
                    className="flex-1"
                    inputClassName="text-center"
                />

                <Button type="submit" variant="primary" form={formID}>
                    Lookup Unique Code
                </Button>
            </CardContent>
        </Card>
    );
};