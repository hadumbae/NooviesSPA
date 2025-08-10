import {z} from "zod";
import {
    PaginatedPersonDetailsSchema,
    PaginatedPersonsSchema,
    PersonArraySchema, PersonDetailsArraySchema,
    PersonDetailsSchema,
    PersonSchema
} from "@/pages/persons/schema/person/Person.schema.ts";

/**
 * Represents a person.
 *
 * Inferred from {@link PersonSchema}.
 */
export type Person = z.infer<typeof PersonSchema>;

/**
 * Represents detailed information about a person.
 *
 * Inferred from {@link PersonDetailsSchema}.
 */
export type PersonDetails = z.infer<typeof PersonDetailsSchema>;

/**
 * Represents an array of persons.
 *
 * Inferred from {@link PersonArraySchema}.
 */
export type PersonArray = z.infer<typeof PersonArraySchema>;

/**
 * Represents an array of detailed persons.
 *
 * Inferred from {@link PersonDetailsArraySchema}.
 */
export type PersonDetailsArray = z.infer<typeof PersonDetailsArraySchema>;

/**
 * Represents a paginated response of persons.
 *
 * Inferred from {@link PaginatedPersonsSchema}.
 */
export type PaginatedPersons = z.infer<typeof PaginatedPersonsSchema>;

/**
 * Represents a paginated response of detailed persons.
 *
 * Inferred from {@link PaginatedPersonDetailsSchema}.
 */
export type PaginatedPersonDetails = z.infer<typeof PaginatedPersonDetailsSchema>;