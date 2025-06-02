import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Represents the base structure for a movie credit entry.
 *
 * @remarks
 * This interface defines common properties shared by both cast and crew members
 * in a movie credit. It includes identifiers, role type, optional notes, and
 * specific fields relevant to either cast or crew roles.
 */
export interface IMovieCreditBase {
    /**
     * Unique identifier for the movie credit entry.
     */
    readonly _id: ObjectId;

    /**
     * Specifies the type of role: either 'CAST' or 'CREW'.
     */
    roleType: "CAST" | "CREW";

    /**
     * Optional notes or comments about the credit.
     * Can be null.
     */
    notes?: string | null;

    /**
     * Job title or position held by the crew member.
     * Applicable only when roleType is 'CREW'.
     */
    job?: string;

    /**
     * Name of the character portrayed by the cast member.
     * Applicable only when roleType is 'CAST'.
     */
    characterName?: string;

    /**
     * Billing order of the cast member in the credits.
     * Applicable only when roleType is 'CAST'.
     */
    billingOrder?: number;

    /**
     * Indicates if the credit is uncredited.
     */
    uncredited?: boolean;

    /**
     * Indicates if the role is voice-only.
     */
    voiceOnly?: boolean;

    /**
     * Indicates if the appearance is a cameo.
     */
    cameo?: boolean;

    /**
     * Indicates if the role involves motion capture performance.
     */
    motionCapture?: boolean;
}