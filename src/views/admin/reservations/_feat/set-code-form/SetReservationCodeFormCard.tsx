/**
 * @fileoverview Card-based UI component for the reservation code lookup form.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the SetReservationCodeFormCard component. */
type ViewProps = {
    className?: string;
    containerClassName?: string;
};

/**
 * Styled card containing the input and submission trigger for reservation lookups.
 */
export function SetReservationCodeFormCard(
    {className, containerClassName}: ViewProps
): ReactElement {
    const {formID} = useBaseFormContext();
    const {control} = useFormContext();

    return (
        <Card className={containerClassName}>
            <CardContent className={cn("p-3 flex flex-col space-y-2", className)}>
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
}