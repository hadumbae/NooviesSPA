/**
 * @fileoverview Utility for merging Tailwind CSS classes with clsx and tailwind-merge.
 */

import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

/**
 * Merges multiple class names or conditional class objects into a single string.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
