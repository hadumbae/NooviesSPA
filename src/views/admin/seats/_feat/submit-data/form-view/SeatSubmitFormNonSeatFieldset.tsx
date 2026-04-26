import {ReactElement} from 'react';
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";

type FieldsetProps = Pick<FormViewProps<SeatFormValues>, "disableFields">;

export function SeatSubmitFormNonSeatFieldset(
    {disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {
                    !disableFields?.row &&
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={control}
                    />
                }

                {
                    !disableFields?.x &&
                    <HookFormInput
                        name="x"
                        label="X Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={control}
                    />
                }

                {
                    !disableFields?.y &&
                    <HookFormInput
                        name="y"
                        label="Y Coordinate"
                        type="number"
                        min={1}
                        step={1}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}