/**
 * Payload for updating a user’s password.
 *
 * Contains both the new password and its confirmation to ensure they match.
 *
 * @public
 */
export default interface IUserPasswordUpdate {
    /**
     * The new password to set for the user.
     *
     * @remarks
     * Should meet the application’s password policy (e.g., minimum length, complexity).
     */
    password: string;

    /**
     * Confirmation of the new password.
     *
     * @remarks
     * Must exactly match the value of `password`.
     */
    confirm: string;
}