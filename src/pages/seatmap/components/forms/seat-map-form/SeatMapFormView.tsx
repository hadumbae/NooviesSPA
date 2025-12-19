import {Form} from "@/common/components/ui/form.tsx";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapForm, SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {SeatMapFormValuesSchema} from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";
import {Loader} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import SeatMapFormPriceFields from "@/pages/seatmap/components/forms/seat-map-form/fieldset/SeatMapFormPriceFields.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatMapFormDetailsFields
    from "@/pages/seatmap/components/forms/seat-map-form/fieldset/SeatMapFormDetailsFields.tsx";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {cloneElement} from "react";

type ViewProps = FormViewProps<SeatMapDetails, SeatMapForm, SeatMapFormValues> & {
    className?: string;
    seatMapScreen: ObjectId;
};

const SeatMapFormView = (props: ViewProps) => {
    const {
        className,
        seatMapScreen,
        isPanel,
        form,
        disableFields,
        submitHandler,
        mutation: {isPending},
    } = props;

    // --- Fields ---
    const activeFields = getActiveSchemaInputFields({
        schema: SeatMapFormValuesSchema,
        disableFields,
    });

    const fieldGroups: HookFormFieldGroup<SeatMapFormValues>[] = [
        {
            render: true,
            key: "seat-map-details-field",
            fields: ["seat", "status"],
            element: <SeatMapFormDetailsFields
                form={form}
                activeFields={activeFields}
                seatMapScreen={seatMapScreen}
            />
        },
        {
            render: true,
            key: "seat-map-price-field",
            fields: ["basePrice", "priceMultiplier", "overridePrice"],
            element: <SeatMapFormPriceFields
                form={form}
                activeFields={activeFields}
                isPanel={isPanel}
            />
        },
    ];

    const fields = fieldGroups.map(({render, fields, key, element}) =>
        render && fields.some(field => activeFields[field])
            ? cloneElement(element, {key})
            : null
    );


    // --- Button Text ---
    const buttonText = isPending
        ? <Loader className="animate-spin"/>
        : "Submit";


    // --- Render ---
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {fields}

                <Button variant="default" type="submit" className="w-full">
                    {buttonText}
                </Button>
            </form>
        </Form>
    );
};

export default SeatMapFormView;
