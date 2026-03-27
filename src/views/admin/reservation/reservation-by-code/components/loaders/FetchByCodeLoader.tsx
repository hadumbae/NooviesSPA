/**
 * @file Specialized data loader for administrative reservation lookups.
 * @filename FetchByCodeLoader.tsx
 */

import {ReservationUniqueCode} from "@/domains/reservation/schema/model";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReactNode} from "react";
import {
    useFetchReservationByCode
} from "@/domains/reservation/views/admin/reservation-by-code/fetch/useFetchReservationByCode.ts";
import {
    FetchByCodeData,
    FetchByCodeDataSchema
} from "@/domains/reservation/views/admin/reservation-by-code/schemas/FetchByCodeDataSchema.ts";

/**
 * Props for {@link FetchByCodeLoader}.
 */
type LoaderProps = | {
    /** Render prop receiving validated reservation data. */
    children: (data: FetchByCodeData) => ReactNode;
    /** Triggers the fetch and validation logic. @default true */
    isEnabled?: true;
    /** The validated verification code to query. */
    code: ReservationUniqueCode;
} | {
    /** Render prop receiving null. */
    children: (data: null) => ReactNode;
    /** Bypasses the query and validation. */
    isEnabled: false;
    /** Code is not applicable when disabled. */
    code?: null;
};

/**
 * Orchestrates fetching and validation for reservation lookups by code.
 * @param `props` - The component properties containing the code and render children.
 */
export const FetchByCodeLoader = (props: LoaderProps) => {
    const {code, isEnabled} = props;

    const query = useFetchReservationByCode({
        code: code!,
        options: {enabled: isEnabled}
    });

    if (props.isEnabled === false) {
        return (
            <ValidatedDataLoader query={query} schema={FetchByCodeDataSchema} isEnabled={false} >
                {props.children}
            </ValidatedDataLoader>
        );
    }

    return (
        <ValidatedDataLoader
            query={query}
            schema={FetchByCodeDataSchema}
        >
            {props.children}
        </ValidatedDataLoader>
    );
};