/**
 * @fileoverview Form view for filtering and sorting a user's reservations.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {HookFormInput, HookFormRadioGroup, HookFormSortToggle} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {ReservationStatusFilterRadioGroupOptions, ReservationTypeFilterRadioGroupOptions} from "@/domains/reservations";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {Button} from "@/common/components/ui";
import {X} from "lucide-react";

/** Props for the MyReservationsQueryOptionFormView component. */
type ViewProps = {
    className?: string
};

/**
 * Form component for managing reservation query options including status, type, and sorting.
 */
export function MyReservationsQueryOptionFormView(
    {className}: ViewProps
): ReactElement {
    const {control, watch, reset} = useFormContext();
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error(`'${MyReservationsQueryOptionFormView.name}' requires a submit handler.`);
    }

    useAutoFormSubmit({submitHandler});
    const hasValues = Object.entries(watch()).filter(([_, value]) => value).length > 0;

    const clearFilters = () => reset({
        uniqueCode: "",
        status: "",
        type: "",
        sortByStatus: "",
        sortByDateReserved: "",
    });

    return (
        <div className={cn(
            "flex flex-col space-y-4",
            className,
        )}>
            <div className="space-y-4">
                <div className="space-x-2 flex items-center">
                    <span className="primary-text font-bold text-sm">Unique Code</span>
                    <HookFormInput name="uniqueCode" placeholder="Unique Code" control={control}/>
                </div>

                <div className="space-x-2 flex md:items-center">
                    <span className="primary-text font-bold text-sm">Status</span>
                    <HookFormRadioGroup
                        name="status"
                        classNames={{container: "flex flex-wrap"}}
                        items={ReservationStatusFilterRadioGroupOptions}
                    />
                </div>

                <div className="space-x-2 flex md:items-center">
                    <span className="primary-text font-bold text-sm">Type</span>
                    <HookFormRadioGroup
                        name="reservationType"
                        classNames={{container: "flex flex-wrap"}}
                        items={ReservationTypeFilterRadioGroupOptions}
                    />
                </div>
            </div>

            <div className="flex max-md:flex-col max-md:space-y-2 md:items-center md:space-x-4">
                <HookFormSortToggle label="Sort By Status" name="sortByStatus"/>
                <HookFormSortToggle label="Sort By Reserved Date" name="sortByDateReserved"/>
            </div>

            {hasValues && (
                <Button variant="secondary" onClick={clearFilters}>
                    <X/> Clear
                </Button>
            )}
        </div>
    );
}