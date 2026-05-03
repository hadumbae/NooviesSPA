import {ReactElement} from "react";
import {SeatFormDisableFields, SeatSubmitFormView} from "@/views/admin/seats/_feat/submit-data";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/features/generic-form-context";
import {Button} from "@/common/components/ui/button.tsx";
import {RotateCcw} from "lucide-react";


export function SeatContextPanelFormView(): ReactElement {
    const {reset} = useFormContext();
    const {formID, isPending} = useBaseFormContext();

    const disableFields: SeatFormDisableFields = {
        theatre: true,
        screen: true,
    };

    return (
        <div className="space-y-5">
            <SeatSubmitFormView disableFields={disableFields} isNestedView={true}/>

            <div className="flex items-center space-x-2">
                <Button
                    form={formID}
                    variant="primary"
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </Button>

                <Button
                    variant="secondary"
                    type="button"
                    disabled={isPending}
                    onClick={() => reset()}
                >
                    <RotateCcw className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}