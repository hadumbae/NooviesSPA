/**
 * @fileoverview A dialog component containing the search and sort options for querying genres.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {ListFilter} from "lucide-react";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog";
import {Button} from "@/common/components/ui/button.tsx";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {cn} from "@/common/lib/utils.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

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
                        <SectionHeader>Search</SectionHeader>
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
                        <SectionHeader>Ordering</SectionHeader>
                        <Separator className="mt-1"/>
                    </header>

                    <HookFormSortToggle
                        name="sortByName"
                        label="Sort by Name"
                        control={control}
                    />
                </fieldset>
            </DialogContent>
        </Dialog>
    );
}
