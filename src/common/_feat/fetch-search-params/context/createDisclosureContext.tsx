/**
 * @fileoverview Factory function for creating React context providers and hooks to manage disclosure (open/close) state and actions.
 */

import {createContext, ReactElement, ReactNode, useContext, useMemo, useState} from "react";
import {InvalidContextError} from "@/common/_err";

/** Configuration options for initialising a disclosure context factory. */
type ContextConfig = {
    stateName: string;
    setterName: string;
    defaultOpenState?: boolean;
}

/** Props for the disclosure context Provider component. */
type ProviderConfig = {
    children: ReactNode;
}

/** Helper functions for controlling open/closed disclosure state. */
type DisclosureActions = {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

/** Context provider and hook functions returned by the disclosure context factory. */
type FactoryReturns = {
    Provider: (config: ProviderConfig) => ReactElement;
    useDisclosureState: () => boolean;
    useDisclosureActions: () => DisclosureActions;
}

/**
 * Creates React context state/action hooks and a provider component for managing disclosure state.
 */
export function createDisclosureContext(
    {stateName, setterName, defaultOpenState = false}: ContextConfig
): FactoryReturns {
    const StateContext = createContext<boolean | null>(null);
    const SetterContext = createContext<DisclosureActions | null>(null);

    StateContext.displayName = stateName;
    SetterContext.displayName = setterName;

    function Provider({children}: ProviderConfig): ReactElement {
        const [isOpen, setIsOpen] = useState<boolean>(defaultOpenState);

        const actions: DisclosureActions = useMemo(() => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
            toggle: () => setIsOpen(prev => !prev),
        }), []);

        return (
            <StateContext.Provider value={isOpen}>
                <SetterContext.Provider value={actions}>
                    {children}
                </SetterContext.Provider>
            </StateContext.Provider>
        );
    }

    function useDisclosureState(): boolean {
        const ctx = useContext(StateContext);

        if (ctx === null) {
            throw new InvalidContextError({
                code: "required_provider",
                contextName: StateContext.displayName,
                message: `Must be used within provider for "${StateContext.displayName}" context.`
            });
        }

        return ctx;
    }

    function useDisclosureActions(): DisclosureActions {
        const ctx = useContext(SetterContext);

        if (ctx === null) {
            throw new InvalidContextError({
                code: "required_provider",
                contextName: SetterContext.displayName,
                message: `Must be used within provider for "${SetterContext.displayName}" context.`
            });
        }

        return ctx;
    }

    return {
        Provider,
        useDisclosureState,
        useDisclosureActions,
    };
}