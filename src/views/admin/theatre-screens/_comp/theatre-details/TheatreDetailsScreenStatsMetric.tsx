/**
 * @fileoverview Reusable metric card for displaying numerical theatre screen statistics.
 */

import {ReactElement} from "react";

/** Props for the TheatreDetailsScreenStatsMetric component. */
type MetricProps = {
    label: string;
    count: number;
};

/**
 * Renders a styled statistical metric with a label and a large count.
 */
export function TheatreDetailsScreenStatsMetric({label, count}: MetricProps): ReactElement {
    return (
        <dl className="bg-secondary border p-2 rounded-xl space-y-1">
            <dt className="secondary-text text-xs font-bold uppercase">{label}</dt>
            <dd className="primary-text text-xl font-extrabold">{count}</dd>
        </dl>
    );
}