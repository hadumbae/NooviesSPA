import { z } from "zod";
import { ShowingFormSchema, ShowingFormValuesSchema } from "@/pages/showings/schema/form/ShowingForm.schema.ts";

/**
 * Type representing the **starter/default values** of a showing form.
 *
 * Inferred from `ShowingFormValuesSchema`.
 * Typically used for form initialization and prefilled values.
 *
 * @example
 * ```ts
 * const defaultValues: ShowingFormValues = {
 *   startTime: "",
 *   startDate: "",
 *   endTime: "",
 *   endDate: "",
 *   ticketPrice: 0,
 *   language: "en",
 *   subtitleLanguages: [],
 *   isSpecialEvent: false,
 *   isActive: true,
 *   movie: "",
 *   theatre: "",
 *   screen: "",
 *   status: "scheduled",
 * };
 * ```
 */
export type ShowingFormValues = z.infer<typeof ShowingFormValuesSchema>;

/**
 * Type representing a **validated showing form submission**.
 *
 * Inferred from `ShowingFormSchema`.
 * This type is guaranteed to satisfy all the validation rules defined in the schema.
 *
 * @example
 * ```ts
 * const formSubmission: ShowingForm = {
 *   startTime: "15:30",
 *   startDate: "2024-05-12",
 *   endTime: "17:45",
 *   endDate: "2024-05-12",
 *   ticketPrice: 12.5,
 *   language: "en",
 *   subtitleLanguages: ["fr", "es"],
 *   isSpecialEvent: true,
 *   isActive: true,
 *   movie: "movieId123",
 *   theatre: "theatreId456",
 *   screen: "screenId789",
 *   status: "scheduled",
 * };
 * ```
 */
export type ShowingForm = z.infer<typeof ShowingFormSchema>;
