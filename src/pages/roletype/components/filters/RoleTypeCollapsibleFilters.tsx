import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ListFilter} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import useRoleTypeQueryOptionSearchParams
    from "@/pages/roletype/hooks/params/query-option-search-params/useRoleTypeQueryOptionSearchParams.ts";
import useRoleTypeQueryOptionForm from "@/pages/roletype/hooks/forms/useRoleTypeQueryOptionForm.ts";
import {
    RoleTypeQueryOptions,
    RoleTypeQueryOptionsFormValues
} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import RoleTypeQueryOptionFormView from "@/pages/roletype/components/forms/filters/RoleTypeQueryOptionFormView.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * A collapsible filter panel for {@link RoleType} entities.
 *
 * @remarks
 * - Uses a `Collapsible` component with a trigger button (`ListFilter` icon).
 * - Loads initial filter values from search params via {@link useRoleTypeQueryOptionSearchParams}.
 * - Submits filter form values back into the query parameters using {@link setQueryOptionValues}.
 * - Renders {@link RoleTypeQueryOptionFormView} for the actual form UI.
 *
 * @example
 * ```tsx
 * <RoleTypeCollapsibleFilters />
 * ```
 */
const RoleTypeCollapsibleFilters: FC = () => {
    /**
     * Local state for controlling collapsible panel visibility.
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Hook for reading & updating query parameters for role type filters.
     */
    const {searchParams, setQueryOptionValues} = useRoleTypeQueryOptionSearchParams();

    /**
     * Hook for initializing the query option form, seeded with current URL params.
     */
    const form = useRoleTypeQueryOptionForm({presetValues: searchParams});

    /**
     * Handles form submission by pushing values into query params.
     *
     * @param values - Current query option values from the form.
     */
    const onSubmit = (values: RoleTypeQueryOptionsFormValues) => {
        setQueryOptionValues(values as RoleTypeQueryOptions);
    };

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="link" className="text-neutral-400 hover:text-black" size="sm">
                    <ListFilter /> {isOpen && "Close"} Filters
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <Separator />
                <RoleTypeQueryOptionFormView form={form} submitHandler={onSubmit} />
                <Separator />
            </CollapsibleContent>
        </Collapsible>
    );
};

export default RoleTypeCollapsibleFilters;