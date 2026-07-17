/**
 * @fileoverview Utility for formatting strings into title case.
 */

/** Converts a space-separated string to title case. */
export function convertToTitleCase(text: string) {
    return text
        .toLowerCase()
        .split(' ')
        .map((word: string) => (word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ');
}