/**
 * @fileoverview Utility for formatting and extracting initials from strings.
 */

/** Extracts the first character of every word in a string. */
export function getInitials(sentence: string): string {
    return sentence
        .split(" ")
        .map(word => word[0])
        .join("");
}
