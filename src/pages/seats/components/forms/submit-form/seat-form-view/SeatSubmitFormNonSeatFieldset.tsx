import {FC, ReactElement} from 'react';
import {UseFormReturn} from "react-hook-form";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

type FieldsetProps = {
    /** The react-hook-form instance managing seat form state and validation. */
    form: UseFormReturn<SeatFormValues>;

    /**
     * Indicates which row fields to show.
     * Relevant keys include:
     * - `row`
     * - `seatNumber`
     * - `seatLabel`
     */
    activeFields: Record<keyof SeatFormValues, boolean>;
};

const SeatSubmitFormNonSeatFieldset: FC<FieldsetProps> = ({form, activeFields}): ReactElement => {
    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator />
            </div>

            <div className="grid grid-cols-3 gap-2">
                {activeFields["row"] && (
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={form.control}
                    />
                )}

                {
                    activeFields["x"] &&
                    <HookFormInput
                        name="x"
                        label="X Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {
                    activeFields["y"] &&
                    <HookFormInput
                        name="y"
                        label="Y Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }
            </div>
        </fieldset>
    );
};

export default SeatSubmitFormNonSeatFieldset;
