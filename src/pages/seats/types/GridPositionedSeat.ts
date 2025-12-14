/**
 * @summary
 * Grid-based seat positioning data.
 *
 * @remarks
 * Represents the row label and 2D coordinates of a seat
 * within a seating layout grid.
 */
export type GridPositionedSeat = {
    row: string;
    x: number;
    y: number;
};
