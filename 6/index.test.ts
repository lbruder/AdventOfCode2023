import { test, expect } from "bun:test";
import { parseInput } from "./index";

const testInput = "Time:      7  15   30\nDistance:  9  40  200\n";
const testRaces = parseInput(testInput);

test("parseInput", () => {
    expect(testRaces.length).toBe(3);
    expect(testRaces[0]).toMatchObject({time:  7, distance:   9});
    expect(testRaces[1]).toMatchObject({time: 15, distance:  40});
    expect(testRaces[2]).toMatchObject({time: 30, distance: 200});
});

test("getDistance", () => {
    expect(testRaces[0].getDistance(0)).toBe(0);
    expect(testRaces[0].getDistance(1)).toBe(6);
    expect(testRaces[0].getDistance(2)).toBe(10);
    expect(testRaces[0].getDistance(3)).toBe(12);
    expect(testRaces[0].getDistance(4)).toBe(12);
    expect(testRaces[0].getDistance(5)).toBe(10);
    expect(testRaces[0].getDistance(6)).toBe(6);
    expect(testRaces[0].getDistance(7)).toBe(0);
});

test("getNumWinningPressTimes", () => {
    expect(testRaces[0].getNumWinningPressTimes()).toBe(4);
    expect(testRaces[1].getNumWinningPressTimes()).toBe(8);
    expect(testRaces[2].getNumWinningPressTimes()).toBe(9);
});
