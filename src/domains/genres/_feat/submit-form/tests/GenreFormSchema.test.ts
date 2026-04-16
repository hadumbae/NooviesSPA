/**
 * @fileoverview Unit tests for GenreFormSchema.
 * Validates the Zod schema's enforcement of required fields, length constraints,
 * and optional metadata (like IDs) for genre submission forms.
 */

import {describe, it, expect} from "vitest";
import {GenreFormSchema} from "@/domains/genres/_feat/submit-form";

describe("Valid data for form schema.", () => {
    it('should accept valid data', () => {
        const {success} = GenreFormSchema.safeParse({
            name: "Anime",
            description: "Animation from Japan.",
        });

        expect(success).toBe(true);
    });

    it('should accept different but valid data', () => {
        const {success} = GenreFormSchema.safeParse({
            _id: "694d5e600065d0d6912f6c02",
            name: "Manga",
            description: "Comic books from Japan.",
        });

        expect(success).toBe(true);
    });
});

describe("Invalid data for form schema.", () => {
    it('should refuse empty data', () => {
        const {success, error} = GenreFormSchema.safeParse({});

        expect(success).toBe(false);

        expect(error?.errors[0].path[0]).toBe("name");
        expect(error?.errors[0].code).toBe("invalid_type");

        expect(error?.errors[1].path[0]).toBe("description");
        expect(error?.errors[1].code).toBe("invalid_type");
    });

    it('should refuse invalid data', () => {
        const {success, error} = GenreFormSchema.safeParse({
            name: "M",
            description: "",
        });

        expect(success).toBe(false);

        expect(error?.errors[0].path[0]).toBe("name");
        expect(error?.errors[0].code).toBe("too_small");

        expect(error?.errors[1].path[0]).toBe("description");
        expect(error?.errors[1].code).toBe("too_small");
    });
});