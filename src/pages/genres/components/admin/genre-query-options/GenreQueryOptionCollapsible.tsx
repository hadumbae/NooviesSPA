import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import {GenreQueryOptionFormValues} from "@/pages/genres/schema/filters/GenreQueryOptionForm.types.ts";
import {ListFilter} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import GenreQueryOptionFormContainer
    from "@/pages/genres/components/admin/genre-query-options/GenreQueryOptionFormContainer.tsx";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link GenreQueryOptionCollapsible}.
 */
type CollapsibleProps = PresetOpenState & FormOptions<GenreQueryOptionFormValues> & {
    /**
     * Optional class name applied to the internal {@link GenreQueryOptionFormContainer}.
     * Useful for layout customization or additional styling hooks.
     */
    className?: string;
}

/**
 * A collapsible container that wraps the genre query filter and sort form.
 *
 * This component provides a toggleable UI section that can either be:
 * - **Controlled** via `presetOpen` and `setPresetOpen`, or
 * - **Uncontrolled**, using internal state management.
 *
 * It renders a filter button that expands or collapses the filter form,
 * typically used in admin or listing interfaces to refine displayed genres.
 *
 * @component
 * @example
 * ```tsx
 * <GenreQueryOptionCollapsible
 *   presetValues={{ name: "Action" }}
 *   disableFields={["sortByName"]}
 * />
 * ```
 */
const GenreQueryOptionCollapsible: FC<CollapsibleProps> = (props) => {
    const {className, presetOpen, setPresetOpen, disableFields, presetValues} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Determine whether the collapsible state is controlled externally or internally
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return (
        <Collapsible open={activeOpen} onOpenChange={setActiveOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="link" className="text-neutral-400 hover:text-black" size="sm">
                    <ListFilter /> {isOpen && "Close"} Filters
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <GenreQueryOptionFormContainer
                    disableFields={disableFields}
                    presetValues={presetValues}
                    className={className}
                />
            </CollapsibleContent>
        </Collapsible>
    );
};

export default GenreQueryOptionCollapsible;
