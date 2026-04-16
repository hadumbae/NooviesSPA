/**
 * @fileoverview Unit tests for the useGenreSubmitForm hook.
 * Validates the initialization logic, ensuring proper merging and prioritization
 * of default values, existing genre data, and external preset overrides.
 */

import {renderHook} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {useGenreSubmitForm} from "@/domains/genres/_feat/submit-form";

describe("useGenreSubmitForm", () => {
    it("should initialise with no preset values", () => {
        const {result: {current}} = renderHook(() => useGenreSubmitForm());

        expect(current.getValues()).toEqual({name: "", description: ""});
    });

    it("should initialise with preset values", () => {
        const presetValues = {
            name: "Anime",
            description: "Animation from Japan."
        };

        const {result: {current}} = renderHook(() => useGenreSubmitForm({presetValues}));

        expect(current.getValues()).toEqual(presetValues);
    });

    it("should initialise with genre", () => {
        const genre = {
            _id: "694d5e600065d0d6912f6c02",
            name: "Psychological",
            description: "The most dangerous place of all is inside the mind.",
            slug: "psychological-gtzij7",
            movieCount: 20,
        };

        const {result: {current}} = renderHook(() => useGenreSubmitForm({genre}));

        expect(current.getValues()).toEqual(genre);
    });

    it("should initialise with both genre and preset values", () => {
        const presetValues = {
            name: "Anime",
            description: "Animation from Japan."
        };

        const genre = {
            _id: "694d5e600065d0d6912f6c02",
            name: "Psychological",
            description: "The most dangerous place of all is inside the mind.",
            slug: "psychological-gtzij7",
            movieCount: 20,
        };

        const {result: {current}} = renderHook(() => useGenreSubmitForm({genre, presetValues}));
        const values = current.getValues();

        expect(values.name).toEqual(presetValues.name);
        expect(values.description).toEqual(presetValues.description);
    });
});