import { test, expect } from "bun:test";
import { Range, Map, parseInput } from "./index";

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;


const almanac = parseInput(testInput);

test("parseInput", () => {
    expect(almanac.seeds).toBeArrayOfSize(4);
    expect(almanac.seeds.join(",")).toBe("79,14,55,13")
    expect(almanac.maps).toBeArrayOfSize(7);
    expect(almanac.maps[5]).toMatchObject({input: "temperature", output: "humidity"});
    expect(almanac.maps[5].ranges).toBeArrayOfSize(2);
    expect(almanac.maps[5].ranges[0]).toMatchObject({startInput: 69, startOutput: 0, count: 1});
    expect(almanac.maps[5].ranges[1]).toMatchObject({startInput: 0, startOutput: 1, count: 69});
});

test("Range.getValue", () => {
    const testRange = new Range(10, 20, 5);
    
    expect(testRange.getValue(9)).toBeNull();
    expect(testRange.getValue(10)).toBe(20);
    expect(testRange.getValue(11)).toBe(21);
    expect(testRange.getValue(12)).toBe(22);
    expect(testRange.getValue(13)).toBe(23);
    expect(testRange.getValue(14)).toBe(24);
    expect(testRange.getValue(15)).toBeNull();
});

test("Map.getValue", () => {
    const testMap = new Map("foo", "bar", [new Range(10, 20, 5), new Range(100, 200, 5)]);
    
    expect(testMap.getValue(9)).toBe(9);
    expect(testMap.getValue(10)).toBe(20);
    expect(testMap.getValue(11)).toBe(21);
    expect(testMap.getValue(12)).toBe(22);
    expect(testMap.getValue(13)).toBe(23);
    expect(testMap.getValue(14)).toBe(24);
    expect(testMap.getValue(15)).toBe(15);

    expect(testMap.getValue(99)).toBe(99);
    expect(testMap.getValue(100)).toBe(200);
    expect(testMap.getValue(101)).toBe(201);
    expect(testMap.getValue(102)).toBe(202);
    expect(testMap.getValue(103)).toBe(203);
    expect(testMap.getValue(104)).toBe(204);
    expect(testMap.getValue(105)).toBe(105);
});

test("Almanac.getValue", () => {
    expect(almanac.getValue("seed", 79, "location")).toBe(82);
    expect(almanac.getValue("seed", 14, "location")).toBe(43);
    expect(almanac.getValue("seed", 55, "location")).toBe(86);
    expect(almanac.getValue("seed", 13, "location")).toBe(35);
});

test("Almanac.getMinLocation", () => {
    expect(almanac.getMinLocation()).toBe(35);
});

test("Map.getReverse", () => {
    const testMap = new Map("foo", "bar", [new Range(10, 20, 5), new Range(100, 200, 5)]);
    
    expect(testMap.getReverse(19)).toEqual([19]);
    expect(testMap.getReverse(20)).toEqual([10]);
    expect(testMap.getReverse(21)).toEqual([11]);
    expect(testMap.getReverse(22)).toEqual([12]);
    expect(testMap.getReverse(23)).toEqual([13]);
    expect(testMap.getReverse(24)).toEqual([14]);
    expect(testMap.getReverse(25)).toEqual([25]);

    expect(testMap.getReverse(199)).toEqual([199]);
    expect(testMap.getReverse(200)).toEqual([100]);
    expect(testMap.getReverse(201)).toEqual([101]);
    expect(testMap.getReverse(202)).toEqual([102]);
    expect(testMap.getReverse(203)).toEqual([103]);
    expect(testMap.getReverse(204)).toEqual([104]);
    expect(testMap.getReverse(205)).toEqual([205]);
});

test("Almanac.getMinLocationWithSeedRanges", () => {
    expect(almanac.getMinLocationWithSeedRanges()).toBe(46);
});
