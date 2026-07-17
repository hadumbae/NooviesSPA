/**
 * @fileoverview A dialog component containing the search and sort options for querying genres.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ListFilter} from "lucide-react";
import {HookFormInput} from "@/views/common/_feat";
import {HookFormSortToggle} from "@/views/common/_feat";
import {Separator} from "@/common/components/ui/separator.tsx";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {SectionTitle} from "@/views/common/_comp";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui";

/** Props for the GenreQueryOptionFormDialog component. */
type FormViewProps = {
    className?: string;
};

/**
 * Renders a dialog with form inputs for filtering and sorting genres.
 */
export function GenreQueryOptionFormDialog({className}: FormViewProps): ReactElement {
    const {control} = useFormContext();
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error(`'${GenreQueryOptionFormDialog.name}' requires a 'submitHandler'.`);
    }

    useAutoFormSubmit({submitHandler});

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="link" className="gap-2">
                    <ListFilter size={16}/>
                    <span>Filters</span>
                </Button>
            </DialogTrigger>

            <DialogContent className={cn("gap-y-6", className)}>
                <DialogHeader className="hidden">
                    <DialogTitle>Genre Query Options</DialogTitle>
                    <DialogDescription>Query genres via search strings and sorts.</DialogDescription>
                </DialogHeader>

                <fieldset className="space-y-4">
                    <header>
                        <SectionTitle>Search</SectionTitle>
                        <Separator className="mt-1"/>
                    </header>

                    <HookFormInput
                        name="name"
                        label="Genre Name"
                        placeholder="e.g. Science Fiction"
                        control={control}
                    />
                </fieldset>

                <fieldset className="space-y-4">
                    <header>
                        <SectionTitle>Ordering</SectionTitle>
                        <Separator className="mt-1"/>
                    </header>

                    <HookFormSortToggle
                        name="sortByName"
                        label="Sort by Name"
                    />
                </fieldset>
            </DialogContent>
        </Dialog>
    );
}
