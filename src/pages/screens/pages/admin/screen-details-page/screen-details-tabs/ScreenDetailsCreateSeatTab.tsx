/**
 * @file TheatreScreenCreateSeatTab.tsx
 * @summary
 * Provides the "Create Seats" administrative tab for a theatre screen.
 *
 * @remarks
 * This tab:
 * - Pre-fills and locks the `theatre` and `screen` form fields.
 * - Uses `SeatFormContext` to access session-only submitted seats.
 * - Shows a live-updating list of seats created during this session.
 *
 * The component must be rendered inside a `SeatFormContext.Provider`. This is
 * enforced at runtime by `useRequiredContext`, which throws a descriptive error
 * when the provider is missing.
 *
 * @see SeatSubmitFormContainer
 * @see SeatFormSubmitList
 * @see SeatFormContext
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import SeatFormSubmitList from "@/pages/screens/components/theatre-screens/admin/features/seat-submit/SeatFormSubmitList.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ReactElement} from "react";

/**
 * @component ScreenDetailsCreateSeatTab
 * @description
 * Renders the seat-creation interface for a theatre screen, including:
 *
 * - A form that submits new seats with locked `theatre` and `screen` fields.
 * - Context-driven access to seats created in the current admin session.
 * - A list that updates when seats are submitted.
 *
 * @returns A `TabsContent` element containing the seat creation tools.
 *
 * @example
 * ```tsx
 * <ScreenDetailsCreateSeatTab />
 * ```
 */
const ScreenDetailsCreateSeatTab = (): ReactElement => {
    const {returnedSeats} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    return (
        <TabsContent value="create-seats" className="space-y-4">
            {/* Seat creation form */}
            <section className="space-y-2">
                <SectionHeader>Create Seats</SectionHeader>
                <Card>
                    <CardContent className="p-4">
                        <SeatSubmitFormContainer />
                    </CardContent>
                </Card>
            </section>

            {/* Submitted seat list */}
            {returnedSeats.length > 0 && (
                <section className="space-y-2">
                    <SectionHeader>Seats</SectionHeader>
                    <SeatFormSubmitList />
                </section>
            )}
        </TabsContent>
    );
};

export default ScreenDetailsCreateSeatTab;
