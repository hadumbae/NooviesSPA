/**
 * @fileoverview Context definition for the Genre query option form.
 * Facilitates coordination between filter inputs and the submission logic.
 */

import {createContext} from "react";
import {SubmitHandler} from "react-hook-form";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/schema.ts";

/** Shared values for coordinating Genre filtering UI components. */
export type GenreQueryOptionFormContextValues = {
    formID: string;
    submitHandler: SubmitHandler<GenreQueryOptionFormStarter>;
};

/**
 * Context for providing Genre-specific filter form metadata.
 */
export const GenreQueryOptionFormContext = createContext<GenreQueryOptionFormContextValues | undefined>(undefined);