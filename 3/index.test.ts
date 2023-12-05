import { test, expect } from "bun:test";
import { findGears, findNumbers, findPartNumbers, findStars, makeField, partNumberSum } from "./index";

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test("findNumbers", () => {
    const found = findNumbers(makeField(testInput));
    expect(found.length).toBe(10);
    
    expect(found[0].row).toBe(1);
    expect(found[0].startCol).toBe(1);
    expect(found[0].endCol).toBe(3);
    expect(found[0].value).toBe(467);

    expect(found[1].row).toBe(1);
    expect(found[1].startCol).toBe(6);
    expect(found[1].endCol).toBe(8);
    expect(found[1].value).toBe(114);

    expect(found[2].row).toBe(3);
    expect(found[2].startCol).toBe(3);
    expect(found[2].endCol).toBe(4);
    expect(found[2].value).toBe(35);

    expect(found[3].row).toBe(3);
    expect(found[3].startCol).toBe(7);
    expect(found[3].endCol).toBe(9);
    expect(found[3].value).toBe(633);

    expect(found[4].row).toBe(5);
    expect(found[4].startCol).toBe(1);
    expect(found[4].endCol).toBe(3);
    expect(found[4].value).toBe(617);

    expect(found[5].row).toBe(6);
    expect(found[5].startCol).toBe(8);
    expect(found[5].endCol).toBe(9);
    expect(found[5].value).toBe(58);

    expect(found[6].row).toBe(7);
    expect(found[6].startCol).toBe(3);
    expect(found[6].endCol).toBe(5);
    expect(found[6].value).toBe(592);

    expect(found[7].row).toBe(8);
    expect(found[7].startCol).toBe(7);
    expect(found[7].endCol).toBe(9);
    expect(found[7].value).toBe(755);

    expect(found[8].row).toBe(10);
    expect(found[8].startCol).toBe(2);
    expect(found[8].endCol).toBe(4);
    expect(found[8].value).toBe(664);

    expect(found[9].row).toBe(10);
    expect(found[9].startCol).toBe(6);
    expect(found[9].endCol).toBe(8);
    expect(found[9].value).toBe(598);
});

test("findPartNumbers", () => {
    const found = findPartNumbers(testInput);
    expect(found.length).toBe(8);
    
    expect(found[0].row).toBe(1);
    expect(found[0].startCol).toBe(1);
    expect(found[0].endCol).toBe(3);
    expect(found[0].value).toBe(467);

    expect(found[1].row).toBe(3);
    expect(found[1].startCol).toBe(3);
    expect(found[1].endCol).toBe(4);
    expect(found[1].value).toBe(35);

    expect(found[2].row).toBe(3);
    expect(found[2].startCol).toBe(7);
    expect(found[2].endCol).toBe(9);
    expect(found[2].value).toBe(633);

    expect(found[3].row).toBe(5);
    expect(found[3].startCol).toBe(1);
    expect(found[3].endCol).toBe(3);
    expect(found[3].value).toBe(617);

    expect(found[4].row).toBe(7);
    expect(found[4].startCol).toBe(3);
    expect(found[4].endCol).toBe(5);
    expect(found[4].value).toBe(592);

    expect(found[5].row).toBe(8);
    expect(found[5].startCol).toBe(7);
    expect(found[5].endCol).toBe(9);
    expect(found[5].value).toBe(755);

    expect(found[6].row).toBe(10);
    expect(found[6].startCol).toBe(2);
    expect(found[6].endCol).toBe(4);
    expect(found[6].value).toBe(664);

    expect(found[7].row).toBe(10);
    expect(found[7].startCol).toBe(6);
    expect(found[7].endCol).toBe(8);
    expect(found[7].value).toBe(598);
});

test("partNumberSum", () => {
    expect(partNumberSum(testInput)).toBe(4361);
});

test("findStars", () => {
    const stars = findStars(makeField(testInput));
    expect(stars.length).toBe(3);
    expect(stars[0].row).toBe(2);
    expect(stars[0].column).toBe(4);
    expect(stars[1].row).toBe(5);
    expect(stars[1].column).toBe(4);
    expect(stars[2].row).toBe(9);
    expect(stars[2].column).toBe(6);
});

test("findGears", () => {
    const gears = findGears(testInput);
    expect(gears.length).toBe(2);
    expect(gears[0].star.row).toBe(2);
    expect(gears[0].star.column).toBe(4);
    expect(gears[0].ratio).toBe(16345);
    expect(gears[1].star.row).toBe(9);
    expect(gears[1].star.column).toBe(6);
    expect(gears[1].ratio).toBe(451490);
});
