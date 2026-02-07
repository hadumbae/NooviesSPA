/**
 * Generic key–label pair used for tab identification and display.
 *
 * @template TKey - Type of the tab identifier
 * @template TLabel - Type of the tab label
 */
export type TabLabelKey<TKey = string, TLabel = string> = {
    /** Stable identifier for the tab */
    key: TKey;

    /** Human-readable tab label */
    label: TLabel;
};
