/**
 * Parameters for configuring a delete mutation submission.
 */
export type OnDeleteMutationParams = {
    /**
     * Optional success message to display when the deletion succeeds.
     */
    successMessage?: string;

    /**
     * Callback fired when the deletion succeeds.
     */
    onDeleteSuccess?: () => void;

    /**
     * Optional error message to display when the deletion fails.
     */
    errorMessage?: string;

    /**
     * Callback fired when the deletion fails.
     *
     * @param error - The error thrown during deletion.
     */
    onDeleteError?: (error: unknown) => void;
};


