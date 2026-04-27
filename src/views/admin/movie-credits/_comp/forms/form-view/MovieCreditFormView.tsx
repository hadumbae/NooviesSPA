/** @fileoverview Presentational form view for creating or editing movie credits. */

import {useFormContext} from "react-hook-form";
import {RefreshCw} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

import {Button} from "@/common/components/ui/button.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";


import {PrimaryButtonCSS, SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import {
    MovieCreditFormCastFieldset
} from "@/views/admin/movie-credits/_comp/forms/form-view/MovieCreditFormCastFieldset.tsx";
import {
    MovieCreditFormCastFlagFieldset
} from "@/views/admin/movie-credits/_comp/forms/form-view/MovieCreditFormCastFlagFieldset.tsx";
import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data";
import {ReactElement} from "react";
import {
    MovieCreditFormDetailsFieldset
} from "@/views/admin/movie-credits/_comp/forms/form-view/MovieCreditFormDetailsFieldset.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/features/generic-form-context";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";

/** Props for the MovieCreditFormView component. */
type ViewProps = FormViewProps<MovieCreditFormValues>;

/** Renders the movie credit form fields and submission actions. Requires wrapping in a Form provider and BaseFormContext. */
export function MovieCreditFormView(
    {className, disableFields}: ViewProps
): ReactElement {
    const {watch, reset} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});
    const department = watch("department");

    return (
        <div className={cn("space-y-4", className)}>
            <MovieCreditFormDetailsFieldset disableFields={disableFields}/>
            <Separator/>

            {
                department === "CAST" && <>
                    <MovieCreditFormCastFieldset disableFields={disableFields}/>
                    <Separator/>
                </>
            }


            {
                department === "CAST" && <>
                    <MovieCreditFormCastFlagFieldset disableFields={disableFields}/>
                    <Separator/>
                </>
            }

            <section className="grid grid-cols-4 gap-2">
                <Button
                    form={formID}
                    disabled={isPending}
                    className={cn(PrimaryButtonCSS, "bg-primary col-span-3")}
                    variant="default"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    disabled={isPending}
                    className={cn(SecondaryButtonCSS, "bg-secondary text-primary")}
                    variant="secondary"
                    type="button"
                    onClick={() => reset()}
                >
                    <RefreshCw/>
                </Button>
            </section>
        </div>
    );
}