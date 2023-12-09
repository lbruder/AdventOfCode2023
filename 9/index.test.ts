import { test, expect } from "bun:test";
import { puzzle1, readInput } from "./index";

const testInput = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

const testSeries = readInput(testInput);

test("parse", () => {
    expect(testSeries).toBeArrayOfSize(3);
    expect(testSeries[0].values).toBeArrayOfSize(6);
    expect(testSeries[1].values).toBeArrayOfSize(6);
    expect(testSeries[2].values).toBeArrayOfSize(6);
});

test("extrapolate", () => {
    expect(testSeries[0].extrapolate()).toBe(18);
    expect(testSeries[1].extrapolate()).toBe(28);
    expect(testSeries[2].extrapolate()).toBe(68);
});

test("puzzle1", () => {
    expect(puzzle1(testSeries)).toBe(114);
});
