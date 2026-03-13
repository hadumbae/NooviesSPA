/**
 * Departments available for a {@link RoleType}.
 *
 * @remarks
 * In film and television production, roles are typically categorized
 * into two main departments:
 * - `"CAST"` — performing roles in front of the camera.
 * - `"CREW"` — technical and support roles behind the camera.
 *
 * The `as const` assertion makes this a readonly tuple of literal types,
 * so consumers can use strict typing (`"CAST" | "CREW"`) rather than `string`.
 *
 * @example
 * ```ts
 * import departments from "./departments";
 *
 * type Department = typeof departments[number];
 *
 * function assignDepartment(dep: Department) {
 *   // dep must be "CAST" | "CREW"
 * }
 *
 * assignDepartment("CAST"); // ✅
 * assignDepartment("CREW"); // ✅
 * assignDepartment("EXTRA"); // ❌ Type error
 * ```
 */
export default ["CAST", "CREW"] as const;