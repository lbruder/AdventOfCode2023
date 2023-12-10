import { test, expect } from "bun:test";
import { parseInput, Position } from "./index";

const testInput1 = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`;

const testInput2 = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`;

const testBoard1 = parseInput(testInput1);
const testBoard2 = parseInput(testInput2);

test("findStartPosition", () => {
    const p1 = testBoard1.findStartPosition();
    const p2 = testBoard2.findStartPosition();
    expect(p1.x).toBe(1);
    expect(p1.y).toBe(1);
    expect(p2.x).toBe(0);
    expect(p2.y).toBe(2);
});

test("getConnections1", () => {
    const t: Position = new Position(testBoard1, 1, 1, null);
    const connections = t.getConnections();
    expect(connections).toBeArrayOfSize(2);

    // HACK: This ties the test awfully close to the implementation
    expect(connections[0].x).toBe(1);
    expect(connections[0].y).toBe(2);
    expect(connections[1].x).toBe(2);
    expect(connections[1].y).toBe(1);
});

test("getConnections2", () => {
    const t: Position = new Position(testBoard2, 0, 2, null);
    const connections = t.getConnections();
    expect(connections).toBeArrayOfSize(2);

    // HACK: This ties the test awfully close to the implementation
    expect(connections[0].x).toBe(0);
    expect(connections[0].y).toBe(3);
    expect(connections[1].x).toBe(1);
    expect(connections[1].y).toBe(2);
});

test("puzzle1", () => {
    expect(new Position(testBoard1, 1, 1, null).puzzle1()).toBe(4);
    expect(new Position(testBoard2, 0, 2, null).puzzle1()).toBe(8);
});
